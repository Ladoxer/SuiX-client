import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css',
})
export class MissionsComponent {
  filters = ['All', 'Health', 'Learning', 'Mindfulness', 'Career'];
  currentFilter = 'All';

  missions = [
    {
      type: 'Health',
      xp: 100,
      title: '30-Minute Exercise',
      description:
        'Complete a 30-minute workout session focusing on cardio and strength training.',
      difficulty: 'Medium',
      estimatedTime: 30,
      completed: false,
    },
    {
      type: 'Learning',
      xp: 150,
      title: 'Coding Practice',
      description:
        'Solve two algorithm challenges on your preferred coding platform.',
      difficulty: 'Hard',
      estimatedTime: 45,
      completed: true,
    },
    {
      type: 'Mindfulness',
      xp: 75,
      title: 'Meditation Session',
      description:
        'Practice mindful meditation for 10 minutes using guided techniques.',
      difficulty: 'Easy',
      estimatedTime: 10,
      completed: false,
    },
    {
      type: 'Career',
      xp: 200,
      title: 'Skill Development',
      description:
        'Complete one chapter of your current technical book or online course.',
      difficulty: 'Medium',
      estimatedTime: 60,
      completed: false,
    },
  ];

  get filteredMissions() {
    return this.currentFilter === 'All'
      ? this.missions
      : this.missions.filter((m) => m.type === this.currentFilter);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  toggleMission(mission: any) {
    if (!mission.completed) {
      mission.completed = true;
      // Here we would typically call a service to update the mission status
    }
  }
}
