import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {
  recommendations = [
    {
      icon: 'fas fa-running',
      title: 'Optimize Workout Time',
      description: 'Your peak energy levels are in the morning. Consider scheduling workouts before 10 AM.'
    },
    {
      icon: 'fas fa-brain',
      title: 'Learning Strategy',
      description: 'You show better retention when learning in 25-minute focused sessions.'
    },
    {
      icon: 'fas fa-clock',
      title: 'Productivity Window',
      description: 'Your most productive hours are between 2 PM and 5 PM. Plan important tasks during this time.'
    }
  ];

  patterns = [
    {
      icon: 'fas fa-chart-line',
      title: 'Consistency Pattern',
      description: 'You maintain higher consistency when tasks are scheduled in the afternoon.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Learning Style',
      description: 'You show stronger engagement with practical, hands-on learning approaches.'
    }
  ];
}
