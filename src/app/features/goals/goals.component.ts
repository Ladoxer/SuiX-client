import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoalsService } from '../../core/services/goals.service';
import { UserService } from '../../core/services/user.service';
import { Goal, Milestone, CreateGoalDto } from '../../core/models/goal.model';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css',
})
export class GoalsComponent implements OnInit {
  showAddGoal = false;
  categories = ['All', 'Health', 'Career', 'Learning', 'Personal', 'Mindfulness'];
  currentCategory = 'All';
  goals: Goal[] = [];
  isLoading = true;
  isCreating = false;
  error: string | null = null;
  minDate: string;

  newGoal: {
    title: string;
    description: string;
    category: '' | 'health' | 'learning' | 'career' | 'mindfulness' | 'personal';
    deadline: string;
    difficulty: '' | 'easy' | 'medium' | 'hard';
  } = {
    title: '',
    description: '',
    category: '',
    deadline: '',
    difficulty: ''
  };

  constructor(
    private goalsService: GoalsService,
    private userService: UserService
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadGoals();
  }

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
    if (this.goals.length === 0) return 0;
    const total = this.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(total / this.goals.length);
  }

  setCategory(category: string): void {
    this.currentCategory = category;
  }

  toggleGoalStatus(goal: Goal): void {
    const newStatus = goal.status === 'active' ? 'paused' : 'active';
    this.goalsService.updateGoal(goal._id, { status: newStatus }).subscribe({
      next: (updatedGoal) => {
        const index = this.goals.findIndex(g => g._id === goal._id);
        if (index !== -1) {
          this.goals[index] = updatedGoal;
        }
      },
      error: (err) => {
        console.error('Error updating goal status:', err);
        this.error = 'Failed to update goal status';
      }
    });
  }

  editGoal(goal: Goal): void {
    // TODO: Implement edit functionality with modal
    console.log('Edit goal:', goal);
  }

  toggleMilestone(goal: Goal, milestone: Milestone): void {
    this.goalsService.toggleMilestone(goal._id, milestone.id).subscribe({
      next: (updatedGoal) => {
        const index = this.goals.findIndex(g => g._id === goal._id);
        if (index !== -1) {
          this.goals[index] = updatedGoal;
        }
      },
      error: (err) => {
        console.error('Error toggling milestone:', err);
        this.error = 'Failed to update milestone';
      }
    });
  }

  closeModal(): void {
    this.showAddGoal = false;
    // Reset form
    this.newGoal = {
      title: '',
      description: '',
      category: '',
      deadline: '',
      difficulty: ''
    };
  }

  createGoal(): void {
    // Validate form
    if (!this.newGoal.title || !this.newGoal.description || !this.newGoal.category ||
        !this.newGoal.deadline || !this.newGoal.difficulty) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.isCreating = true;
    this.error = null;

    const userId = this.userService.getCurrentUserId();
    const goalData = {
      title: this.newGoal.title,
      description: this.newGoal.description,
      category: this.newGoal.category as 'health' | 'learning' | 'career' | 'mindfulness' | 'personal',
      deadline: new Date(this.newGoal.deadline),
      difficulty: this.newGoal.difficulty as 'easy' | 'medium' | 'hard'
    };

    this.goalsService.createGoal(userId, goalData).subscribe({
      next: (createdGoal) => {
        console.log('Goal created successfully:', createdGoal);
        // Add new goal to the list
        this.goals.unshift(createdGoal);
        // Close modal and reset form
        this.closeModal();
        this.isCreating = false;
        // Show success message
        alert('Goal created successfully! AI has generated milestones and your first mission.');
      },
      error: (err) => {
        console.error('Error creating goal:', err);
        this.error = 'Failed to create goal. Please try again.';
        this.isCreating = false;
      }
    });
  }

  private loadGoals(): void {
    const userId = this.userService.getCurrentUserId();
    this.isLoading = true;

    this.goalsService.getGoals(userId).subscribe({
      next: (goals) => {
        this.goals = goals;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading goals:', err);
        this.error = 'Failed to load goals';
        this.isLoading = false;
      }
    });
  }
}
