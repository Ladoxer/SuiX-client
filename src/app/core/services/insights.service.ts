import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Insight } from '../models/insight.model';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  private apiUrl = `${environment.apiUrl}/insights`;

  constructor(private http: HttpClient) {}

  /**
   * Get insights with optional filters
   */
  getInsights(filters?: {
    userId?: string;
    type?: string;
    limit?: number;
  }): Observable<Insight[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get<Insight[]>(this.apiUrl, { params });
  }

  /**
   * Get latest weekly insight
   */
  getLatestWeeklyInsight(userId: string): Observable<Insight> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Insight>(`${this.apiUrl}/latest/weekly`, { params });
  }

  /**
   * Generate weekly insights
   */
  generateWeeklyInsights(userId: string): Observable<Insight> {
    return this.http.post<Insight>(`${this.apiUrl}/generate/weekly`, { userId });
  }

  /**
   * Mark insight as viewed
   */
  markAsViewed(insightId: string): Observable<Insight> {
    return this.http.post<Insight>(`${this.apiUrl}/${insightId}/viewed`, {});
  }
}
