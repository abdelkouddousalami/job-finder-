import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FavoriteOffer } from '../../models/favorite.model';
import { AuthService } from '../../services/auth.service';
import * as FavoritesActions from '../../store/favorites/favorites.actions';
import { selectAllFavorites, selectFavoritesLoading } from '../../store/favorites/favorites.selectors';
import { FavoriteCardComponent } from './favorite-card/favorite-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FavoriteCardComponent],
  template: `
    <div class="container py-4">
      <h2 class="page-header">My Favorite Offers</h2>

      <!-- Loading -->
      <div *ngIf="loading$ | async" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Chargement...</p>
      </div>

      <!-- Success message -->
      <div *ngIf="successMsg" class="alert alert-success alert-dismissible fade show">
        {{ successMsg }}
        <button type="button" class="btn-close" (click)="successMsg=''"></button>
      </div>

      <!-- List -->
      <div *ngIf="(favorites$ | async) as favorites">
        <div *ngIf="favorites.length === 0 && !(loading$ | async)" class="text-center py-5">
          <h4 class="text-muted">Aucune offre en favoris</h4>
          <p>Ajoutez des offres à vos favoris depuis la page de recherche.</p>
        </div>

        <div class="row g-3">
          <div class="col-md-6 col-lg-4" *ngFor="let fav of favorites">
            <app-favorite-card
              [favorite]="fav"
              (remove)="onRemove($event)">
            </app-favorite-card>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<FavoriteOffer[]>;
  loading$!: Observable<boolean>;
  successMsg = '';

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.store.dispatch(FavoritesActions.loadFavorites({ userId }));
    }
    this.favorites$ = this.store.select(selectAllFavorites);
    this.loading$ = this.store.select(selectFavoritesLoading);
  }

  onRemove(fav: FavoriteOffer): void {
    if (fav.id && confirm('Supprimer cette offre des favoris ?')) {
      this.store.dispatch(FavoritesActions.removeFavorite({ id: fav.id }));
      this.successMsg = 'Offre retirée des favoris';
      setTimeout(() => this.successMsg = '', 3000);
    }
  }
}
