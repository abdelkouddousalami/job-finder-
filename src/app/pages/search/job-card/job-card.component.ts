import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffer } from '../../../models/job-offer.model';
import { RelativeDatePipe } from '../../../pipes/relative-date.pipe';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe, TruncatePipe],
  template: `
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">{{ job.title }}</h5>
          <span class="badge bg-secondary">{{ job.datePublished | relativeDate }}</span>
        </div>
        <h6 class="card-subtitle mb-2 text-primary">{{ job.company }}</h6>
        <p class="text-muted mb-2">
          <small>{{ job.location }}</small>
          <span *ngIf="job.remote" class="badge bg-secondary ms-2">Remote</span>
        </p>
        <p class="card-text flex-grow-1">{{ job.description | truncate:180 }}</p>
        <div class="d-flex flex-wrap gap-1 mb-2" *ngIf="job.tags && job.tags.length">
          <span *ngFor="let tag of job.tags.slice(0, 3)" class="badge bg-light text-dark border">{{ tag }}</span>
        </div>
        <div class="mt-auto d-flex flex-wrap gap-2">
          <a [href]="job.url" target="_blank" class="btn btn-outline-primary btn-sm">
            View Offer
          </a>
          <button *ngIf="isAuthenticated" class="btn btn-sm"
                  [class.btn-outline-danger]="!isFav"
                  [class.btn-danger]="isFav"
                  (click)="toggleFavorite.emit(job)">
            {{ isFav ? 'Favorited' : 'Add to Favorites' }}
          </button>
          <button *ngIf="isAuthenticated" class="btn btn-outline-info btn-sm"
                  (click)="trackApplication.emit(job)">
            Track Application
          </button>
        </div>
      </div>
    </div>
  `
})
export class JobCardComponent {
  @Input() job!: JobOffer;
  @Input() isAuthenticated = false;
  @Input() isFav = false;
  @Output() toggleFavorite = new EventEmitter<JobOffer>();
  @Output() trackApplication = new EventEmitter<JobOffer>();
}
