import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Mission, CompleteMissionDto, SkipMissionDto } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private apiUrl = `${environment.apiUrl}/missions`;

  constructor(private http: HttpClient) {}

  /**
   * Get all missions with optional filters
   */
  getMissions(filters?: {
    userId?: string;
    status?: string;
    type?: string;
    date?: string;
  }): Observable<Mission[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }
    return this.http.get<Mission[]>(this.apiUrl, { params });
  }

  /**
   * Get today's missions for a user
   */
  getTodayMissions(userId: string): Observable<Mission[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Mission[]>(`${this.apiUrl}/today`, { params });
  }

  /**
   * Get mission statistics
   */
  getMissionStats(userId: string, period?: 'week' | 'month' | 'all'): Observable<any> {
    let params = new HttpParams().set('userId', userId);
    if (period) {
      params = params.set('period', period);
    }
    return this.http.get(`${this.apiUrl}/stats`, { params });
  }

  /**
   * Get single mission by ID
   */
  getMission(missionId: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${missionId}`);
  }

  /**
   * Complete a mission
   */
  completeMission(missionId: string, completionData: CompleteMissionDto): Observable<Mission> {
    return this.http.patch<Mission>(`${this.apiUrl}/${missionId}/complete`, completionData);
  }

  /**
   * Skip a mission
   */
  skipMission(missionId: string, skipData?: SkipMissionDto): Observable<Mission> {
    return this.http.patch<Mission>(`${this.apiUrl}/${missionId}/skip`, skipData || {});
  }
}
