export interface User {
  _id: string;
  level: number;
  xp: number;
  streak: number;
  lastActivityDate: Date;
  totalMissionsCompleted: number;
  totalMissionsCreated: number;
  categoryPerformance: {
    health: number;
    learning: number;
    career: number;
    mindfulness: number;
    personal: number;
  };
  aiProfile: {
    averageCompletionTime: number;
    preferredDifficulty: 'easy' | 'medium' | 'hard';
    bestPerformanceTimeOfDay: 'morning' | 'afternoon' | 'evening';
    consistencyScore: number;
    motivationLevel: number;
  };
  weeklyStats: Array<{
    week: Date;
    missionsCompleted: number;
    missionsAssigned: number;
    xpEarned: number;
    categories: {
      health: number;
      learning: number;
      career: number;
      mindfulness: number;
      personal: number;
    };
  }>;
  achievements: string[];
}
