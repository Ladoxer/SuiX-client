import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MissionsService } from '../../core/services/missions.service';
import { UserService } from '../../core/services/user.service';
import { Mission } from '../../core/models/mission.model';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../core/components/empty-state/empty-state.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeMissions: Mission[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private missionsService: MissionsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodayMissions();
  }

  get completedToday(): number {
    return this.activeMissions.filter(m => m.status === 'completed').length;
  }

  get totalToday(): number {
    return this.activeMissions.length;
  }

  get xpEarnedToday(): number {
    return this.activeMissions
      .filter(m => m.status === 'completed')
      .reduce((sum, m) => sum + m.xp, 0);
  }

  navigateToGoals(): void {
    this.router.navigate(['/goals']);
  }

  loadTodayMissions(): void {
    const userId = this.userService.getCurrentUserId();
    this.isLoading = true;
    this.error = null;

    this.missionsService.getTodayMissions(userId).subscribe({
      next: (missions) => {
        this.activeMissions = missions;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading missions:', err);
        this.error = 'Failed to load missions. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
