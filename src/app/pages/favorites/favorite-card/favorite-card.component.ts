import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteOffer } from '../../../models/favorite.model';
import { RelativeDatePipe } from '../../../pipes/relative-date.pipe';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  template: `
    <div class="card shadow-sm h-100">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ favorite.title }}</h5>
        <h6 class="card-subtitle mb-2 text-primary">{{ favorite.company }}</h6>
        <p class="text-muted"><small>{{ favorite.location }}</small></p>
        <p class="text-muted"><small>Added {{ favorite.dateAdded | relativeDate }}</small></p>
        <div class="mt-auto d-flex gap-2">
          <a [href]="favorite.url" target="_blank" class="btn btn-outline-primary btn-sm">
            View Offer
          </a>
          <button class="btn btn-outline-danger btn-sm" (click)="remove.emit(favorite)">
            Remove
          </button>
        </div>
      </div>
    </div>
  `
})
export class FavoriteCardComponent {
  @Input() favorite!: FavoriteOffer;
  @Output() remove = new EventEmitter<FavoriteOffer>();
}
