import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';
import { JobOffer } from '../../models/job-offer.model';
import { FavoriteOffer } from '../../models/favorite.model';
import { Application } from '../../models/application.model';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { JobCardComponent } from './job-card/job-card.component';
import * as FavoritesActions from '../../store/favorites/favorites.actions';
import { selectAllFavorites } from '../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, JobCardComponent],
  template: `
    <div class="container py-4">
      <h2 class="page-header">Job Search</h2>
      <app-search-bar (search)="onSearch($event)"></app-search-bar>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
        <p class="mt-2 text-muted">Recherche en cours...</p>
      </div>

      <!-- Error -->
      <div *ngIf="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

      <!-- Success message -->
      <div *ngIf="successMsg" class="alert alert-success alert-dismissible fade show">
        {{ successMsg }}
        <button type="button" class="btn-close" (click)="successMsg=''"></button>
      </div>

      <!-- Results -->
      <div *ngIf="!loading && searched">
        <p class="text-muted mb-3">{{ jobs.length }} résultat(s) trouvé(s)</p>

        <div class="row g-3">
          <div class="col-md-6 col-lg-4" *ngFor="let job of paginatedJobs">
            <app-job-card
              [job]="job"
              [isAuthenticated]="isAuthenticated"
              [isFav]="isFavorite(job.id)"
              (toggleFavorite)="onToggleFavorite($event)"
              (trackApplication)="onTrackApplication($event)">
            </app-job-card>
          </div>
        </div>

        <!-- Pagination -->
        <nav *ngIf="totalPages > 1" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" [class.disabled]="currentPage === 1">
              <a class="page-link" (click)="goToPage(currentPage - 1)">Précédent</a>
            </li>
            <li class="page-item" *ngFor="let p of pages" [class.active]="p === currentPage">
              <a class="page-link" (click)="goToPage(p)">{{ p }}</a>
            </li>
            <li class="page-item" [class.disabled]="currentPage === totalPages">
              <a class="page-link" (click)="goToPage(currentPage + 1)">Suivant</a>
            </li>
          </ul>
        </nav>

        <!-- Load More from API -->
        <div *ngIf="hasMoreApiPages && jobs.length > 0" class="text-center mt-3">
          <button class="btn btn-outline-primary" (click)="loadMoreFromApi()" [disabled]="loading">
            Charger plus de résultats depuis l'API
          </button>
        </div>
      </div>

      <!-- No results -->
      <div *ngIf="!loading && searched && jobs.length === 0" class="text-center py-5">
        <h4 class="text-muted">Aucun résultat trouvé</h4>
        <p>Essayez avec d'autres mots clés ou une autre localisation.</p>
      </div>
    </div>
  `
})
export class SearchComponent implements OnInit {
  jobs: JobOffer[] = [];
  loading = false;
  searched = false;
  errorMsg = '';
  successMsg = '';
  isAuthenticated = false;
  favoriteIds: string[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  apiPage = 1;
  hasMoreApiPages = true;
  lastKeyword = '';
  lastLocation = '';

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private applicationService: ApplicationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const userId = this.authService.getUserId();
      if (userId) {
        this.store.dispatch(FavoritesActions.loadFavorites({ userId }));
      }
      this.store.select(selectAllFavorites).subscribe(favs => {
        this.favoriteIds = favs.map(f => f.offerId);
      });
    }
  }

  onSearch(criteria: { keyword: string; location: string }): void {
    this.lastKeyword = criteria.keyword;
    this.lastLocation = criteria.location;
    this.jobs = [];
    this.apiPage = 1;
    this.currentPage = 1;
    this.hasMoreApiPages = true;
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.searched = true;
    this.errorMsg = '';

    this.jobService.searchJobs(this.lastKeyword, this.lastLocation, this.apiPage).subscribe({
      next: (result) => {
        this.jobs = [...this.jobs, ...result.jobs];
        this.hasMoreApiPages = result.hasMore;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.message || 'Erreur lors de la recherche';
      }
    });
  }

  loadMoreFromApi(): void {
    this.apiPage++;
    this.loadJobs();
  }

  get paginatedJobs(): JobOffer[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.jobs.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.jobs.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
  }

  isFavorite(offerId: string): boolean {
    return this.favoriteIds.includes(offerId);
  }

  onToggleFavorite(job: JobOffer): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    if (this.isFavorite(job.id)) {
      // Already favorite - need to get the favorite ID to remove
      this.store.select(selectAllFavorites).subscribe(favs => {
        const fav = favs.find(f => f.offerId === job.id);
        if (fav?.id) {
          this.store.dispatch(FavoritesActions.removeFavorite({ id: fav.id }));
          this.successMsg = 'Offre retirée des favoris';
          setTimeout(() => this.successMsg = '', 3000);
        }
      }).unsubscribe();
    } else {
      const favorite: FavoriteOffer = {
        userId,
        offerId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        url: job.url,
        apiSource: job.apiSource,
        dateAdded: new Date().toISOString()
      };
      this.store.dispatch(FavoritesActions.addFavorite({ favorite }));
      this.successMsg = 'Offre ajoutée aux favoris !';
      setTimeout(() => this.successMsg = '', 3000);
    }
  }

  onTrackApplication(job: JobOffer): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    const application: Application = {
      userId,
      offerId: job.id,
      apiSource: job.apiSource,
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.url,
      status: 'en_attente',
      notes: '',
      dateAdded: new Date().toISOString()
    };

    this.applicationService.addApplication(application).subscribe({
      next: () => {
        this.successMsg = 'Candidature ajoutée au suivi !';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => {
        this.errorMsg = 'Erreur lors de l\'ajout de la candidature';
      }
    });
  }
}
