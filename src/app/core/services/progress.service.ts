import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';
import { MissionsService } from './missions.service';
import { GoalsService } from './goals.service';
import { UserService } from './user.service';

export interface ProgressData {
  xpGrowth: { label: string; value: number }[];
  missionsCompleted: { label: string; value: number }[];
  focusAreas: { label: string; value: number }[];
  weeklyCompletion: number;
  monthlyCompletion: number;
  totalXP: number;
  currentStreak: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor(
    private http: HttpClient,
    private missionsService: MissionsService,
    private goalsService: GoalsService,
    private userService: UserService
  ) {}

  /**
   * Get comprehensive progress data for analytics
   */
  getProgressData(userId: string, period: 'week' | 'month' | 'all' = 'month'): Observable<ProgressData> {
    return combineLatest([
      this.userService.getUser(userId),
      this.missionsService.getMissionStats(userId, period),
      this.goalsService.getGoalStats(userId)
    ]).pipe(
      map(([user, missionStats, goalStats]) => {
        // Transform weekly stats for XP growth chart
        const xpGrowth = user.weeklyStats.slice(-12).map((week, index) => ({
          label: `Week ${index + 1}`,
          value: week.xpEarned
        }));

        // Transform weekly stats for missions completed chart
        const missionsCompleted = user.weeklyStats.slice(-12).map((week, index) => ({
          label: `Week ${index + 1}`,
          value: week.missionsCompleted
        }));

        // Calculate focus areas from category performance
        const focusAreas = [
          { label: 'Health', value: user.categoryPerformance.health },
          { label: 'Learning', value: user.categoryPerformance.learning },
          { label: 'Career', value: user.categoryPerformance.career },
          { label: 'Mindfulness', value: user.categoryPerformance.mindfulness },
          { label: 'Personal', value: user.categoryPerformance.personal }
        ];

        return {
          xpGrowth,
          missionsCompleted,
          focusAreas,
          weeklyCompletion: missionStats.weeklyCompletionRate || 0,
          monthlyCompletion: missionStats.monthlyCompletionRate || 0,
          totalXP: user.xp,
          currentStreak: user.streak
        };
      })
    );
  }
}
