import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../../core/services/missions.service';
import { UserService } from '../../core/services/user.service';
import { Mission } from '../../core/models/mission.model';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css',
})
export class MissionsComponent implements OnInit {
  filters = ['All', 'Health', 'Learning', 'Mindfulness', 'Career', 'Personal'];
  currentFilter = 'All';
  missions: Mission[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private missionsService: MissionsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  get filteredMissions() {
    if (this.currentFilter === 'All') {
      return this.missions;
    }
    return this.missions.filter((m) =>
      m.type.toLowerCase() === this.currentFilter.toLowerCase()
    );
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  toggleMission(mission: Mission): void {
    if (mission.status === 'completed') {
      return; // Already completed
    }

    // Mark as completed
    const completionData = {
      actualTimeSpent: mission.estimatedTime,
      userRating: 5,
      difficultyRating: 3
    };

    this.missionsService.completeMission(mission._id, completionData).subscribe({
      next: (updatedMission) => {
        // Update the mission in the list
        const index = this.missions.findIndex(m => m._id === mission._id);
        if (index !== -1) {
          this.missions[index] = updatedMission;
        }
        // Refresh user data to update XP
        this.userService.refreshUser();
      },
      error: (err) => {
        console.error('Error completing mission:', err);
        this.error = 'Failed to complete mission';
      }
    });
  }

  private loadMissions(): void {
    const userId = this.userService.getCurrentUserId();
    this.isLoading = true;

    this.missionsService.getMissions({ userId }).subscribe({
      next: (missions) => {
        this.missions = missions;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading missions:', err);
        this.error = 'Failed to load missions';
        this.isLoading = false;
      }
    });
  }
}
