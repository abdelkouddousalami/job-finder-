import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <form [formGroup]="searchForm" (ngSubmit)="onSearch()">
          <div class="row g-3 align-items-end">
            <div class="col-md-5">
              <label class="form-label fw-bold">Keywords (job title)</label>
              <input type="text" class="form-control" formControlName="keyword"
                     placeholder="Ex: Developer, Manager, Designer...">
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold">Location</label>
              <input type="text" class="form-control" formControlName="location"
                     placeholder="Ex: Berlin, Munich, Remote...">
            </div>
            <div class="col-md-3">
              <button type="submit" class="btn btn-primary w-100">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<{ keyword: string; location: string }>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      keyword: [''],
      location: ['']
    });
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }
}
