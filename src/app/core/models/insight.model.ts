export interface Recommendation {
  icon: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Pattern {
  icon: string;
  title: string;
  description: string;
  confidence: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface Insight {
  _id: string;
  userId: string;
  type: 'weekly' | 'monthly' | 'achievement' | 'performance_alert';
  title: string;
  description: string;
  category: 'recommendation' | 'pattern' | 'achievement' | 'warning';
  generatedDate: Date;
  weekStartDate: Date;
  analytics: {
    productivityScore: number;
    completionRate: number;
    consistencyScore: number;
    focusAreas: string[];
    improvementAreas: string[];
    strongCategories: string[];
    weakCategories: string[];
  };
  recommendations: Recommendation[];
  patterns: Pattern[];
  weeklyMetrics: {
    xpEarned: number;
    missionsCompleted: number;
    missionsAssigned: number;
    avgCompletionTime: number;
    categoryBreakdown: Record<string, number>;
    comparisonWithPrevious: {
      xpChange: number;
      completionRateChange: number;
      consistencyChange: number;
    };
  };
  generationContext: {
    model: string;
    prompt: string;
    dataPoints: number;
    confidence: number;
  };
  viewed: boolean;
  viewedAt?: Date;
  createdAt?: Date;
}
