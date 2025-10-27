export interface Milestone {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: Date;
  order: number;
}

export interface Goal {
  _id: string;
  userId: string;
  title: string;
  description: string;
  category: 'health' | 'learning' | 'career' | 'mindfulness' | 'personal';
  deadline: Date;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  milestones: Milestone[];
  aiConfig: {
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedDuration: number;
    requiredSkills: string[];
    preferredTimeSlots: string[];
    adaptiveDifficulty: boolean;
  };
  performance: {
    totalMissions: number;
    completedMissions: number;
    skippedMissions: number;
    averageCompletionRate: number;
    performanceTrend: 'improving' | 'stable' | 'declining';
  };
  originalPrompt: string;
  lastMissionGenerated?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateGoalDto {
  userId: string;
  title: string;
  description: string;
  category: 'health' | 'learning' | 'career' | 'mindfulness' | 'personal';
  deadline: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
}
