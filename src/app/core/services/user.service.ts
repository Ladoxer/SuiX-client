import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Default user ID - in a real app, this would come from authentication
  private readonly DEFAULT_USER_ID = '507f1f77bcf86cd799439011';

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  /**
   * Get current user ID (in production, this would come from auth service)
   */
  getCurrentUserId(): string {
    return this.DEFAULT_USER_ID;
  }

  /**
   * Load current user data
   */
  loadCurrentUser(): void {
    this.getUser(this.DEFAULT_USER_ID).subscribe({
      next: (user) => this.currentUserSubject.next(user),
      error: (error) => console.error('Error loading user:', error)
    });
  }

  /**
   * Get user by ID (creates if doesn't exist)
   */
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  /**
   * Get current user value
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Add XP to user
   */
  addXp(userId: string, xp: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/xp`, { xp }).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  /**
   * Refresh current user data
   */
  refreshUser(): void {
    this.loadCurrentUser();
  }
}
