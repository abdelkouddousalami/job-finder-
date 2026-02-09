import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavoritesCount } from '../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="classic-navbar">
      <div class="navbar-top-line"></div>
      <div class="container">
        <div class="navbar-content">
          <a class="brand" routerLink="/">
            <span class="brand-letter">J</span>
            <span class="brand-letter">o</span>
            <span class="brand-letter">b</span>
            <span class="brand-letter">F</span>
            <span class="brand-letter">i</span>
            <span class="brand-letter">n</span>
            <span class="brand-letter">d</span>
            <span class="brand-letter">e</span>
            <span class="brand-letter">r</span>
          </a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="toggler-line"></span>
            <span class="toggler-line"></span>
            <span class="toggler-line"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="nav-menu">
              <li class="nav-item">
                <a class="nav-link" routerLink="/search" routerLinkActive="active">
                  <span class="link-text">Search</span>
                  <span class="link-underline"></span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/favorites" routerLinkActive="active">
                  <span class="link-text">Favorites</span>
                  <span class="favorites-badge" *ngIf="(favoritesCount$ | async) as count">{{ count }}</span>
                  <span class="link-underline"></span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/applications" routerLinkActive="active">
                  <span class="link-text">Applications</span>
                  <span class="link-underline"></span>
                </a>
              </li>
              <li class="nav-item" *ngIf="isAuthenticated()">
                <a class="nav-link" routerLink="/profile" routerLinkActive="active">
                  <span class="link-text">Profile</span>
                  <span class="link-underline"></span>
                </a>
              </li>
              <li class="nav-item" *ngIf="isAuthenticated()">
                <a class="nav-link logout-link" (click)="logout()">
                  <span class="link-text">Logout</span>
                  <span class="link-underline"></span>
                </a>
              </li>
            </ul>
            
            <div class="nav-actions">
              <ng-container *ngIf="!isAuthenticated()">
                <a class="nav-action-link" routerLink="/auth/login">Sign In</a>
                <a class="nav-action-btn" routerLink="/auth/register">Sign Up</a>
              </ng-container>
              <ng-container *ngIf="isAuthenticated()">
                <div class="user-info">
                  <span class="user-avatar">{{ currentUser?.firstName?.charAt(0) }}</span>
                  <span class="user-name">{{ currentUser?.firstName }}</span>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .classic-navbar {
      background: #000;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 30px rgba(0,0,0,0.3);
      animation: navSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    @keyframes navSlideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .navbar-top-line {
      height: 2px;
      background: linear-gradient(90deg, #000 0%, #fff 50%, #000 100%);
      background-size: 200% 100%;
      animation: lineShine 3s linear infinite;
    }
    
    @keyframes lineShine {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 0;
      gap: 2rem;
    }
    
    .brand {
      font-size: 1.75rem;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      letter-spacing: 2px;
      display: flex;
      gap: 2px;
    }
    
    .brand-letter {
      display: inline-block;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .brand:hover .brand-letter {
      animation: letterBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .brand:hover .brand-letter:nth-child(1) { animation-delay: 0s; }
    .brand:hover .brand-letter:nth-child(2) { animation-delay: 0.05s; }
    .brand:hover .brand-letter:nth-child(3) { animation-delay: 0.1s; }
    .brand:hover .brand-letter:nth-child(4) { animation-delay: 0.15s; }
    .brand:hover .brand-letter:nth-child(5) { animation-delay: 0.2s; }
    .brand:hover .brand-letter:nth-child(6) { animation-delay: 0.25s; }
    .brand:hover .brand-letter:nth-child(7) { animation-delay: 0.3s; }
    .brand:hover .brand-letter:nth-child(8) { animation-delay: 0.35s; }
    .brand:hover .brand-letter:nth-child(9) { animation-delay: 0.4s; }
    
    @keyframes letterBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .navbar-toggler {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .toggler-line {
      width: 25px;
      height: 2px;
      background: #fff;
      transition: all 0.3s ease;
    }
    
    .navbar-collapse {
      display: flex !important;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
    }
    
    .nav-menu {
      display: flex;
      gap: 3rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-item {
      position: relative;
    }
    
    .nav-link {
      color: #ccc;
      text-decoration: none;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 0.875rem;
      position: relative;
      display: inline-block;
      transition: color 0.3s ease;
    }
    
    .link-text {
      position: relative;
      z-index: 1;
    }
    
    .link-underline {
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: #fff;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .favorites-badge {
      position: absolute;
      top: -8px;
      right: -12px;
      background: #fff;
      color: #000;
      font-size: 0.625rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
      animation: badgePulse 2s ease-in-out infinite;
    }
    
    @keyframes badgePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .nav-link:hover .favorites-badge {
      background: #000;
      color: #fff;
      animation: none;
    }
    
    .logout-link {
      cursor: pointer;
    }
    
    .nav-link:hover, .nav-link.active {
      color: #fff;
    }
    
    .nav-link:hover .link-underline, .nav-link.active .link-underline {
      width: 100%;
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .nav-action-link {
      color: #ccc;
      text-decoration: none;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .nav-action-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: #fff;
      transition: width 0.3s ease;
    }
    
    .nav-action-link:hover {
      color: #fff;
    }
    
    .nav-action-link:hover::after {
      width: 100%;
    }
    
    .nav-action-btn {
      padding: 0.75rem 2rem;
      background: #fff;
      color: #000;
      text-decoration: none;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 0.875rem;
      border: 2px solid #fff;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .nav-action-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: #000;
      transform: translate(-50%, -50%);
      transition: all 0.5s ease;
      border-radius: 50%;
    }
    
    .nav-action-btn:hover::before {
      width: 300px;
      height: 300px;
    }
    
    .nav-action-btn:hover {
      color: #fff;
      background: transparent;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1.25rem;
      border: 2px solid #fff;
      color: #fff;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #fff;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
    }
    
    @media (max-width: 992px) {
      .navbar-toggler { display: flex; }
      .navbar-collapse { 
        flex-direction: column;
        margin-top: 1rem; 
      }
      .navbar-collapse:not(.show) {
        display: none !important;
      }
      .nav-menu { flex-direction: column; gap: 1rem; }
      .nav-actions { flex-direction: column; gap: 1rem; width: 100%; }
      .nav-action-btn { width: 100%; text-align: center; }
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;
  favoritesCount$: Observable<number>;

  constructor(private authService: AuthService, private store: Store) {
    this.currentUser = this.authService.getCurrentUser();
    this.favoritesCount$ = this.store.select(selectFavoritesCount);
  }

  ngOnInit(): void {
    // Component initialization
  }

  isAuthenticated(): boolean {
    this.currentUser = this.authService.getCurrentUser();
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
