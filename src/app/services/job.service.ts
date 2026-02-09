import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { JobOffer } from '../models/job-offer.model';

export interface ArbeitnowResponse {
  data: ArbeitnowJob[];
  links: { next: string | null };
  meta: { current_page: number; per_page: number };
}

export interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
}

@Injectable({ providedIn: 'root' })
export class JobService {
  private baseUrl = 'https://www.arbeitnow.com/api/job-board-api';

  constructor(private http: HttpClient) {}

  searchJobs(keyword: string, location: string, page: number = 1): Observable<{ jobs: JobOffer[]; hasMore: boolean }> {
    let url = `${this.baseUrl}?page=${page}`;

    return this.http.get<ArbeitnowResponse>(url).pipe(
      map(response => {
        let jobs = response.data.map(job => this.mapToJobOffer(job));

        // Filter by keyword in title only
        if (keyword && keyword.trim()) {
          const kw = keyword.toLowerCase().trim();
          jobs = jobs.filter(j => j.title.toLowerCase().includes(kw));
        }

        // Filter by location
        if (location && location.trim()) {
          const loc = location.toLowerCase().trim();
          jobs = jobs.filter(j => j.location.toLowerCase().includes(loc));
        }

        // Sort by date descending
        jobs.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

        return {
          jobs,
          hasMore: response.links.next !== null
        };
      })
    );
  }

  private mapToJobOffer(job: ArbeitnowJob): JobOffer {
    return {
      id: job.slug,
      title: job.title,
      company: job.company_name,
      location: job.location || 'Remote',
      description: this.stripHtml(job.description).substring(0, 200) + '...',
      url: job.url,
      datePublished: new Date(job.created_at * 1000).toISOString(),
      tags: job.tags,
      remote: job.remote,
      apiSource: 'arbeitnow'
    };
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
