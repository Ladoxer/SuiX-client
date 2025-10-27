import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLevel = 1;
  progressPercentage = 0;
  streak = 0;
  xp = 0;
  userId: string = '';

  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Get user ID
    this.userId = this.userService.getCurrentUserId();

    // Subscribe to current user updates
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.updateUserStats(user);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateUserStats(user: User): void {
    this.userLevel = user.level;
    this.xp = user.xp;
    this.streak = user.streak;

    // Calculate progress to next level (100 XP per level)
    const xpForCurrentLevel = (user.level - 1) * 100;
    const xpForNextLevel = user.level * 100;
    const xpInCurrentLevel = user.xp - xpForCurrentLevel;
    this.progressPercentage = Math.min(100, (xpInCurrentLevel / 100) * 100);
  }
}
