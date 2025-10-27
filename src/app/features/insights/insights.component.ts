import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InsightsService } from '../../core/services/insights.service';
import { UserService } from '../../core/services/user.service';
import { Insight, Recommendation, Pattern } from '../../core/models/insight.model';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent implements OnInit {
  recommendations: Recommendation[] = [];
  patterns: Pattern[] = [];
  isLoading = true;
  error: string | null = null;
  latestInsight: Insight | null = null;
  productivityScore = 0;
  completionRate = 0;
  consistencyScore = 0;

  constructor(
    private insightsService: InsightsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadLatestInsights();
  }

  generateNewInsights(): void {
    const userId = this.userService.getCurrentUserId();
    this.isLoading = true;

    this.insightsService.generateWeeklyInsights(userId).subscribe({
      next: (insight) => {
        this.latestInsight = insight;
        this.updateInsightData(insight);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error generating insights:', err);
        this.error = 'Failed to generate new insights';
        this.isLoading = false;
      }
    });
  }

  private loadLatestInsights(): void {
    const userId = this.userService.getCurrentUserId();
    this.isLoading = true;

    this.insightsService.getLatestWeeklyInsight(userId).subscribe({
      next: (insight) => {
        this.latestInsight = insight;
        this.updateInsightData(insight);
        this.isLoading = false;

        // Mark as viewed
        if (insight && !insight.viewed) {
          this.insightsService.markAsViewed(insight._id).subscribe();
        }
      },
      error: (err) => {
        console.error('Error loading insights:', err);
        // If no insights found, try to generate new ones
        if (err.status === 404) {
          this.generateNewInsights();
        } else {
          this.error = 'Failed to load insights';
          this.isLoading = false;
        }
      }
    });
  }

  private updateInsightData(insight: Insight): void {
    if (insight) {
      this.recommendations = insight.recommendations || [];
      this.patterns = insight.patterns || [];
      this.productivityScore = insight.analytics?.productivityScore || 0;
      this.completionRate = insight.analytics?.completionRate || 0;
      this.consistencyScore = insight.analytics?.consistencyScore || 0;
    }
  }
}
