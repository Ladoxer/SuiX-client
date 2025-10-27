export interface Mission {
  _id: string;
  userId: string;
  goalId: string;
  title: string;
  description: string;
  type: 'health' | 'learning' | 'career' | 'mindfulness' | 'personal';
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  scheduledDate: Date;
  completedAt?: Date;
  skippedAt?: Date;
  aiContext: {
    generatedBy: string;
    generationPrompt: string;
    adaptationReason?: string;
    basedOnPerformance: boolean;
    difficultyAdjusted: boolean;
    originalDifficulty?: string;
  };
  completionData?: {
    startTime?: Date;
    endTime?: Date;
    actualTimeSpent?: number;
    userRating?: number;
    difficultyRating?: number;
    notes?: string;
  };
  previousMission?: string;
  nextMission?: string;
  sequenceNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompleteMissionDto {
  actualTimeSpent: number;
  userRating?: number;
  difficultyRating?: number;
  notes?: string;
}

export interface SkipMissionDto {
  reason?: string;
}
