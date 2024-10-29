import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: Date;
  progress: number;
  milestones: Milestone[];
  status: 'active' | 'completed' | 'paused';
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css',
})
export class GoalsComponent {
  showAddGoal = false;
  categories = ['All', 'Health', 'Career', 'Learning', 'Personal'];
  currentCategory = 'All';

  goals: Goal[] = [
    {
      id: '1',
      title: 'Master Angular Development',
      description:
        'Become proficient in Angular by building complex applications and understanding advanced concepts.',
      category: 'Career',
      deadline: new Date('2024-06-30'),
      progress: 45,
      status: 'active',
      milestones: [
        {
          id: '1-1',
          title: 'Complete Angular fundamentals course',
          completed: true,
        },
        { id: '1-2', title: 'Build a real-world project', completed: false },
        {
          id: '1-3',
          title: 'Learn NgRx for state management',
          completed: false,
        },
      ],
    },
    {
      id: '2',
      title: 'Improve Physical Fitness',
      description:
        'Achieve better health and fitness through regular exercise and proper nutrition.',
      category: 'Health',
      deadline: new Date('2024-12-31'),
      progress: 30,
      status: 'active',
      milestones: [
        { id: '2-1', title: 'Establish workout routine', completed: true },
        { id: '2-2', title: 'Run 5K without stopping', completed: false },
        { id: '2-3', title: 'Reach target weight', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Learn Machine Learning',
      description:
        'Gain expertise in ML concepts and implement AI-powered features.',
      category: 'Learning',
      deadline: new Date('2024-09-30'),
      progress: 15,
      status: 'active',
      milestones: [
        { id: '3-1', title: 'Complete Python for ML course', completed: true },
        { id: '3-2', title: 'Implement first ML model', completed: false },
        { id: '3-3', title: 'Deploy ML model to production', completed: false },
      ],
    },
  ];

  get filteredGoals() {
    return this.currentCategory === 'All'
      ? this.goals
      : this.goals.filter((g) => g.category === this.currentCategory);
  }

  get activeGoals() {
    return this.goals.filter((g) => g.status === 'active');
  }

  get completedGoals() {
    return this.goals.filter((g) => g.status === 'completed');
  }

  get averageProgress() {
    const total = this.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(total / this.goals.length);
  }

  setCategory(category: string) {
    this.currentCategory = category;
  }

  toggleGoalStatus(goal: Goal) {
    goal.status = goal.status === 'active' ? 'paused' : 'active';
  }

  editGoal(goal: Goal) {
    // Implement edit functionality
  }

  toggleMilestone(goal: Goal, milestone: Milestone) {
    milestone.completed = !milestone.completed;
    this.updateGoalProgress(goal);
  }

  private updateGoalProgress(goal: Goal) {
    const completed = goal.milestones.filter((m) => m.completed).length;
    goal.progress = Math.round((completed / goal.milestones.length) * 100);

    if (goal.progress === 100) {
      goal.status = 'completed';
    }
  }
}
