import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeMissions = [
    {
      type: 'Health',
      xp: 100,
      title: '30-Minute Exercise',
      description: 'Complete a 30-minute workout session focusing on cardio and strength training.',
      completed: false
    },
    {
      type: 'Learning',
      xp: 150,
      title: 'Coding Practice',
      description: 'Solve two algorithm challenges on your preferred coding platform.',
      completed: true
    },
    {
      type: 'Mindfulness',
      xp: 75,
      title: 'Meditation Session',
      description: 'Practice mindful meditation for 10 minutes using guided techniques.',
      completed: false
    }
  ];
}
