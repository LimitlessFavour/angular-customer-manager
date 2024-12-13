import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from '../../services/loading.service';

interface DeleteDialogData {
  customerName: string;
}

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
  standalone: false,
})
export class DeleteConfirmationComponent {
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private loadingService: LoadingService
  ) {}

  async onConfirm(): Promise<void> {
    this.loading = true;
    this.loadingService.show();
    await new Promise(resolve => setTimeout(resolve, 800));
    this.loadingService.hide();
    this.dialogRef.close(true);
  }
}