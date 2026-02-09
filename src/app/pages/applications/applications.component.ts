import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { Application } from '../../models/application.model';
import { ApplicationCardComponent } from './application-card/application-card.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, ApplicationCardComponent],
  template: `
    <div class="container py-4">
      <h2 class="page-header">Application Tracking</h2>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Chargement...</p>
      </div>

      <!-- Messages -->
      <div *ngIf="successMsg" class="alert alert-success alert-dismissible fade show">
        {{ successMsg }}
        <button type="button" class="btn-close" (click)="successMsg=''"></button>
      </div>
      <div *ngIf="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

      <!-- Filter by status -->
      <div class="mb-3" *ngIf="applications.length > 0">
        <div class="btn-group" role="group">
          <button class="btn btn-sm" [class.btn-primary]="filterStatus === 'all'" [class.btn-outline-primary]="filterStatus !== 'all'" (click)="filterStatus='all'">
            All ({{ applications.length }})
          </button>
          <button class="btn btn-sm" [class.btn-warning]="filterStatus === 'en_attente'" [class.btn-outline-warning]="filterStatus !== 'en_attente'" (click)="filterStatus='en_attente'">
            Pending ({{ countByStatus('en_attente') }})
          </button>
          <button class="btn btn-sm" [class.btn-success]="filterStatus === 'accepte'" [class.btn-outline-success]="filterStatus !== 'accepte'" (click)="filterStatus='accepte'">
            Accepted ({{ countByStatus('accepte') }})
          </button>
          <button class="btn btn-sm" [class.btn-danger]="filterStatus === 'refuse'" [class.btn-outline-danger]="filterStatus !== 'refuse'" (click)="filterStatus='refuse'">
            Rejected ({{ countByStatus('refuse') }})
          </button>
        </div>
      </div>

      <!-- Empty -->
      <div *ngIf="!loading && applications.length === 0" class="text-center py-5">
        <h4 class="text-muted">Aucune candidature suivie</h4>
        <p>Ajoutez des candidatures depuis la page de recherche.</p>
      </div>

      <!-- List -->
      <div class="row g-3">
        <div class="col-md-6 col-lg-4" *ngFor="let app of filteredApplications">
          <app-application-card
            [application]="app"
            (statusChange)="onStatusChange($event)"
            (notesUpdate)="onNotesUpdate($event)"
            (remove)="onRemove($event)">
          </app-application-card>
        </div>
      </div>
    </div>
  `
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';
  filterStatus = 'all';

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.loading = true;
    this.applicationService.getApplications(userId).subscribe({
      next: (apps) => {
        this.applications = apps;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.message;
        this.loading = false;
      }
    });
  }

  get filteredApplications(): Application[] {
    if (this.filterStatus === 'all') return this.applications;
    return this.applications.filter(a => a.status === this.filterStatus);
  }

  countByStatus(status: string): number {
    return this.applications.filter(a => a.status === status).length;
  }

  onStatusChange(event: { application: Application; status: string }): void {
    const updated: Application = { ...event.application, status: event.status as Application['status'] };
    this.applicationService.updateApplication(updated).subscribe({
      next: () => {
        const idx = this.applications.findIndex(a => a.id === updated.id);
        if (idx >= 0) this.applications[idx] = updated;
        this.successMsg = 'Statut mis à jour !';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => { this.errorMsg = 'Erreur lors de la mise à jour'; }
    });
  }

  onNotesUpdate(event: { application: Application; notes: string }): void {
    const updated: Application = { ...event.application, notes: event.notes };
    this.applicationService.updateApplication(updated).subscribe({
      next: () => {
        const idx = this.applications.findIndex(a => a.id === updated.id);
        if (idx >= 0) this.applications[idx] = updated;
        this.successMsg = 'Notes sauvegardées !';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => { this.errorMsg = 'Erreur lors de la sauvegarde'; }
    });
  }

  onRemove(app: Application): void {
    if (app.id && confirm('Supprimer cette candidature du suivi ?')) {
      this.applicationService.deleteApplication(app.id).subscribe({
        next: () => {
          this.applications = this.applications.filter(a => a.id !== app.id);
          this.successMsg = 'Candidature supprimée';
          setTimeout(() => this.successMsg = '', 3000);
        },
        error: () => { this.errorMsg = 'Erreur lors de la suppression'; }
      });
    }
  }
}
