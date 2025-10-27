import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProgressService, ProgressData } from '../../core/services/progress.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  timePeriods = ['Week', 'Month', 'Quarter', 'Year'];
  currentPeriod = 'Month';
  achievements: any[] = [];
  isLoading = true;
  error: string | null = null;

  private xpChart: any = null;
  private missionsChart: any = null;
  private focusChart: any = null;

  constructor(
    private progressService: ProgressService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProgressData();
  }

  setPeriod(period: string): void {
    this.currentPeriod = period;
    this.loadProgressData();
  }

  private loadProgressData(): void {
    const userId = this.userService.getCurrentUserId();
    const periodMap: { [key: string]: 'week' | 'month' | 'all' } = {
      'Week': 'week',
      'Month': 'month',
      'Quarter': 'all',
      'Year': 'all'
    };

    this.isLoading = true;
    this.progressService.getProgressData(userId, periodMap[this.currentPeriod]).subscribe({
      next: (data) => {
        this.updateCharts(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading progress data:', err);
        this.error = 'Failed to load progress data';
        this.isLoading = false;
      }
    });
  }

  private updateCharts(data: ProgressData): void {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.createXPChart(data.xpGrowth);
      this.createMissionsChart(data.missionsCompleted);
      this.createFocusChart(data.focusAreas);
    }, 100);
  }

  private createXPChart(xpData: { label: string; value: number }[]): void {
    if (this.xpChart) {
      this.xpChart.destroy();
    }

    const ctx = document.getElementById('xpChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.xpChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xpData.map(d => d.label),
        datasets: [{
          label: 'XP Earned',
          data: xpData.map(d => d.value),
          borderColor: '#4ECDC4',
          backgroundColor: 'rgba(78, 205, 196, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private createMissionsChart(missionData: { label: string; value: number }[]): void {
    if (this.missionsChart) {
      this.missionsChart.destroy();
    }

    const ctx = document.getElementById('missionsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.missionsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: missionData.map(d => d.label),
        datasets: [{
          label: 'Completed Missions',
          data: missionData.map(d => d.value),
          backgroundColor: '#4ECDC4'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private createFocusChart(focusData: { label: string; value: number }[]): void {
    if (this.focusChart) {
      this.focusChart.destroy();
    }

    const ctx = document.getElementById('focusChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.focusChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: focusData.map(d => d.label),
        datasets: [{
          data: focusData.map(d => d.value),
          backgroundColor: [
            '#4ECDC4',
            '#FF6B6B',
            '#45B7AF',
            '#FFD93D',
            '#95E1D3'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  ngOnDestroy(): void {
    if (this.xpChart) this.xpChart.destroy();
    if (this.missionsChart) this.missionsChart.destroy();
    if (this.focusChart) this.focusChart.destroy();
  }
}
