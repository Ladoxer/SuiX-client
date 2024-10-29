import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  timePeriods = ['Week', 'Month', 'Quarter', 'Year'];
  currentPeriod = 'Week';
  achievements = [
    {
      icon: 'fas fa-fire',
      title: '7-Day Streak',
      description: 'Completed daily missions for 7 consecutive days',
      date: new Date('2024-01-15')
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Fitness Warrior',
      description: 'Completed 10 workout sessions',
      date: new Date('2024-01-14')
    },
    {
      icon: 'fas fa-book',
      title: 'Knowledge Seeker',
      description: 'Finished 5 learning missions',
      date: new Date('2024-01-13')
    }
  ];

  ngOnInit() {
    this.initializeCharts();
  }

  setPeriod(period: string) {
    this.currentPeriod = period;
    // Update charts based on the selected period
    this.updateCharts();
  }

  private initializeCharts() {
    this.createXPChart();
    this.createMissionsChart();
    this.createFocusChart();
  }

  private createXPChart() {
    const ctx = document.getElementById('xpChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'XP Earned',
          data: [100, 250, 180, 300, 200, 350, 250],
          borderColor: '#4ECDC4',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  private createMissionsChart() {
    const ctx = document.getElementById('missionsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Completed Missions',
          data: [4, 5, 3, 5, 4, 6, 4],
          backgroundColor: '#4ECDC4'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  private createFocusChart() {
    const ctx = document.getElementById('focusChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Health', 'Learning', 'Career', 'Mindfulness'],
        datasets: [{
          data: [30, 25, 25, 20],
          backgroundColor: [
            '#4ECDC4',
            '#FF6B6B',
            '#45B7AF',
            '#FFD93D'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  private updateCharts() {
    // Update chart data based on the selected time period
  }
}
