import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileFormComponent],
  template: `
    <div class="container py-4">
      <h2 class="page-header">My Profile</h2>

      <div class="row">
        <div class="col-md-8">
          <app-profile-form></app-profile-form>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-danger">
            <div class="card-body">
              <h5 class="card-title text-danger">Zone dangereuse</h5>
              <p class="text-muted">La suppression de votre compte est irréversible.</p>
              <button class="btn btn-danger" (click)="deleteAccount()">
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  deleteAccount(): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) return;

    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.deleteAccount(userId).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Erreur lors de la suppression du compte');
        }
      });
    }
  }
}
