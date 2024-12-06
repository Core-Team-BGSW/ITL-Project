import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onOkClick(): void {
    this.dialogRef.close(true); // true means "OK" was clicked
  }

  onSkipClick(): void {
    this.dialogRef.close(false); // false means "Skip" was clicked
  }
}
