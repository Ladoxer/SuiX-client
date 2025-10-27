import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <div class="empty-icon">
        <i [class]="'fas ' + icon"></i>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button *ngIf="actionText" class="action-btn" (click)="onAction()">
        <i [class]="'fas ' + actionIcon"></i>
        {{ actionText }}
      </button>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
      min-height: 300px;
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 107, 107, 0.1));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .empty-icon i {
      font-size: 2rem;
      color: var(--primary);
    }

    h3 {
      font-size: 1.5rem;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--text-secondary);
      max-width: 400px;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .action-btn {
      padding: 0.75rem 1.5rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      background: var(--primary-variant);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
    }

    @media (max-width: 768px) {
      .empty-state {
        padding: 2rem 1rem;
      }

      .empty-icon {
        width: 60px;
        height: 60px;
      }

      .empty-icon i {
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.25rem;
      }

      p {
        font-size: 0.875rem;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = 'fa-inbox';
  @Input() title: string = 'No items found';
  @Input() message: string = 'Get started by creating your first item';
  @Input() actionText: string = '';
  @Input() actionIcon: string = 'fa-plus';
  @Input() onAction: () => void = () => {};
}
