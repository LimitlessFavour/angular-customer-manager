import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="loading-overlay" *ngIf="loading$ | async">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-dot"></div>
      </div>
    </div>
  `,
    styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .loading-spinner {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
      border-top-color: var(--primary-green);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .spinner-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      background: var(--primary-green);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(0.8); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
      100% { transform: translate(-50%, -50%) scale(0.8); }
    }
  `]
})
export class LoadingIndicatorComponent {
    loading$: Observable<boolean>;

    constructor(private loadingService: LoadingService) {
        this.loading$ = this.loadingService.loading$;
    }
} 