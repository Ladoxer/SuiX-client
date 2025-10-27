import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Goal, CreateGoalDto } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private apiUrl = `${environment.apiUrl}/goals`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new goal
   */
  createGoal(userId: string, goalData: Omit<CreateGoalDto, 'userId'>): Observable<Goal> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Goal>(this.apiUrl, goalData, { params });
  }

  /**
   * Get all goals for a user
   */
  getGoals(userId: string): Observable<Goal[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Goal[]>(this.apiUrl, { params });
  }

  /**
   * Get goal statistics
   */
  getGoalStats(userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(`${this.apiUrl}/stats`, { params });
  }

  /**
   * Get single goal by ID
   */
  getGoal(goalId: string): Observable<Goal> {
    return this.http.get<Goal>(`${this.apiUrl}/${goalId}`);
  }

  /**
   * Update goal
   */
  updateGoal(goalId: string, updates: Partial<Goal>): Observable<Goal> {
    return this.http.patch<Goal>(`${this.apiUrl}/${goalId}`, updates);
  }

  /**
   * Update goal progress
   */
  updateProgress(goalId: string, progress: number): Observable<Goal> {
    return this.http.patch<Goal>(`${this.apiUrl}/${goalId}/progress`, { progress });
  }

  /**
   * Toggle milestone completion
   */
  toggleMilestone(goalId: string, milestoneId: string): Observable<Goal> {
    return this.http.patch<Goal>(
      `${this.apiUrl}/${goalId}/milestones/${milestoneId}/toggle`,
      {}
    );
  }

  /**
   * Delete goal
   */
  deleteGoal(goalId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${goalId}`);
  }
}
