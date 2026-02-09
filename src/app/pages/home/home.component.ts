import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeHeroComponent } from './home-hero/home-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HomeHeroComponent],
  template: `
    <div class="container py-4">
      <app-home-hero></app-home-hero>

      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="card text-center shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">Smart Search</h5>
              <p class="card-text text-muted">Recherchez des offres par mots clés et localisation parmi des sources internationales.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">Favorites</h5>
              <p class="card-text text-muted">Sauvegardez les offres qui vous intéressent pour les retrouver facilement.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">Application Tracking</h5>
              <p class="card-text text-muted">Gérez vos candidatures et suivez leur statut en temps réel.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <a routerLink="/search" class="btn btn-primary btn-lg me-3">Start Searching</a>
        <a routerLink="/register" class="btn btn-outline-primary btn-lg">Create Account</a>
      </div>
    </div>
  `
})
export class HomeComponent {}
