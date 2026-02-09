import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application } from '../../../models/application.model';
import { RelativeDatePipe } from '../../../pipes/relative-date.pipe';

@Component({
  selector: 'app-application-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RelativeDatePipe],
  template: `
    <div class="card shadow-sm h-100">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="card-title mb-0">{{ application.title }}</h5>
          <span class="badge rounded-pill"
                [ngClass]="{
                  'bg-warning text-dark': application.status === 'en_attente',
                  'bg-success': application.status === 'accepte',
                  'bg-danger': application.status === 'refuse'
                }">
            {{ getStatusLabel(application.status) }}
          </span>
        </div>
        <h6 class="card-subtitle mb-2 text-primary">{{ application.company }}</h6>
        <p class="text-muted mb-1"><small>{{ application.location }}</small></p>
        <p class="text-muted mb-2"><small>Added {{ application.dateAdded | relativeDate }}</small></p>

        <!-- Status change -->
        <div class="mb-2">
          <label class="form-label fw-bold small">Change status:</label>
          <select class="form-select form-select-sm" [ngModel]="application.status" (ngModelChange)="onStatusChange($event)">
            <option value="en_attente">Pending</option>
            <option value="accepte">Accepted</option>
            <option value="refuse">Rejected</option>
          </select>
        </div>

        <!-- Notes -->
        <div class="mb-2" *ngIf="showNotes">
          <label class="form-label fw-bold small">Personal notes:</label>
          <textarea class="form-control form-control-sm" rows="2"
                    [ngModel]="application.notes"
                    (ngModelChange)="notesValue=$event"
                    placeholder="Add notes..."></textarea>
          <button class="btn btn-sm btn-outline-primary mt-1" (click)="saveNotes()">Save</button>
        </div>
        <button class="btn btn-sm btn-link p-0 mb-2 text-start" (click)="showNotes = !showNotes">
          {{ showNotes ? 'Hide notes' : 'Add/View notes' }}
        </button>

        <div class="mt-auto d-flex gap-2">
          <a [href]="application.url" target="_blank" class="btn btn-outline-primary btn-sm">
            View Offer
          </a>
          <button class="btn btn-outline-danger btn-sm" (click)="remove.emit(application)">
            Delete
          </button>
        </div>
      </div>
    </div>
  `
})
export class ApplicationCardComponent {
  @Input() application!: Application;
  @Output() statusChange = new EventEmitter<{ application: Application; status: string }>();
  @Output() notesUpdate = new EventEmitter<{ application: Application; notes: string }>();
  @Output() remove = new EventEmitter<Application>();

  showNotes = false;
  notesValue = '';

  getStatusLabel(status: string): string {
    switch (status) {
      case 'en_attente': return 'Pending';
      case 'accepte': return 'Accepted';
      case 'refuse': return 'Rejected';
      default: return status;
    }
  }

  onStatusChange(status: string): void {
    this.statusChange.emit({ application: this.application, status });
  }

  saveNotes(): void {
    this.notesUpdate.emit({ application: this.application, notes: this.notesValue });
  }
}
