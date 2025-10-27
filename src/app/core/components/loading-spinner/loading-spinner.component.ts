import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [class.fullscreen]="fullscreen">
      <div class="spinner" [class.small]="size === 'small'" [class.large]="size === 'large'">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p *ngIf="message" class="spinner-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .spinner-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(247, 249, 252, 0.9);
      z-index: 9999;
    }

    .spinner {
      position: relative;
      width: 60px;
      height: 60px;
    }

    .spinner.small {
      width: 30px;
      height: 30px;
    }

    .spinner.large {
      width: 80px;
      height: 80px;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    .spinner-ring:nth-child(1) {
      animation-delay: -0.45s;
    }

    .spinner-ring:nth-child(2) {
      animation-delay: -0.3s;
      border-top-color: var(--secondary);
    }

    .spinner-ring:nth-child(3) {
      animation-delay: -0.15s;
      border-top-color: var(--primary-variant);
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .spinner-message {
      margin-top: 1rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
      text-align: center;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullscreen: boolean = false;
  @Input() message: string = '';
}
