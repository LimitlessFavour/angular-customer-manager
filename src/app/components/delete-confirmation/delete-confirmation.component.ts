import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-delete-confirmation',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="delete-dialog" [class.loading]="loading">
      <div class="delete-dialog-content">
        <h2>
          <mat-icon class="warning-icon">warning</mat-icon>
          Confirm Delete
        </h2>
        <p>Are you sure you want to delete <strong>{{data.customerName}}</strong>?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>
      <div class="delete-dialog-actions">
        <button mat-button 
                [disabled]="loading"
                (click)="onCancel()">
          Cancel
        </button>
        <button mat-raised-button 
                color="warn" 
                [disabled]="loading"
                (click)="onConfirm()">
          <span class="button-content">
            <mat-icon>delete</mat-icon>
            Delete
          </span>
          <div class="loading-spinner" *ngIf="loading">
            <div class="spinner"></div>
          </div>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .delete-dialog {
      min-width: 400px;
      position: relative;
    }

    .delete-dialog-content {
      padding: 24px;
    }

    h2 {
      color: var(--delete-red);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 16px;
    }

    .warning-icon {
      color: var(--delete-red);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    .warning-text {
      color: var(--text-muted);
      font-size: 0.9em;
      margin-top: 8px;
    }

    .delete-dialog-actions {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      border-top: 1px solid var(--border-green);
    }

    .button-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading .delete-dialog-content,
    .loading .delete-dialog-actions {
      opacity: 0.6;
      pointer-events: none;
    }
  `]
})
export class DeleteConfirmationComponent {
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customerName: string },
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private loadingService: LoadingService
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  async onConfirm(): Promise<void> {
    this.loading = true;
    this.loadingService.show();
    await new Promise(resolve => setTimeout(resolve, 800));
    this.loadingService.hide();
    this.dialogRef.close(true);
  }
}