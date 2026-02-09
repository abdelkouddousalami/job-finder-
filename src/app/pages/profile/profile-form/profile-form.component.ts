import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">Modifier mes informations</h5>

        <div *ngIf="successMsg" class="alert alert-success">{{ successMsg }}</div>
        <div *ngIf="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nom</label>
              <input type="text" class="form-control" formControlName="lastName"
                     [class.is-invalid]="submitted && f['lastName'].errors">
              <div class="form-error" *ngIf="submitted && f['lastName'].errors?.['required']">Requis</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Prénom</label>
              <input type="text" class="form-control" formControlName="firstName"
                     [class.is-invalid]="submitted && f['firstName'].errors">
              <div class="form-error" *ngIf="submitted && f['firstName'].errors?.['required']">Requis</div>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" formControlName="email"
                   [class.is-invalid]="submitted && f['email'].errors">
            <div class="form-error" *ngIf="submitted && f['email'].errors?.['required']">Requis</div>
            <div class="form-error" *ngIf="submitted && f['email'].errors?.['email']">Email invalide</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Nouveau mot de passe (laisser vide pour ne pas changer)</label>
            <input type="password" class="form-control" formControlName="password">
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loading">
            <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  `
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;
  submitted = false;
  loading = false;
  successMsg = '';
  errorMsg = '';
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      lastName: [this.currentUser?.lastName || '', Validators.required],
      firstName: [this.currentUser?.firstName || '', Validators.required],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  get f() { return this.profileForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';
    if (this.profileForm.invalid) return;

    this.loading = true;
    const { lastName, firstName, email, password } = this.profileForm.value;
    const user: User = {
      id: this.currentUser?.id,
      lastName,
      firstName,
      email,
      ...(password ? { password } : {})
    };

    this.authService.updateUser(user).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Profil mis à jour avec succès !';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Erreur lors de la mise à jour';
      }
    });
  }
}
