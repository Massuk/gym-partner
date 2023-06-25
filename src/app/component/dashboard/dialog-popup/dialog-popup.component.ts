import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html'
})
export class DialogPopupComponent {
  confirmButtonText: string = '';
  cancelButtonText: string = '';
  title: string = '';
  description: string = '';
  link: string = '';
  showConfirmButton: boolean = true;
  showCancelButton: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
      link: string;
      confirmButtonText: string;
      cancelButtonText: string;
      showConfirmButton: boolean;
      showCancelButton: boolean;
    },
    public dialogRef: MatDialogRef<DialogPopupComponent>
  ) {
    if (data) {
      this.title = data.title;
      this.description = data.description;
      this.link = data.link;
      this.confirmButtonText = data.confirmButtonText;
      this.cancelButtonText = data.cancelButtonText;
      this.showConfirmButton = data.showConfirmButton ?? true;
      this.showCancelButton = data.showCancelButton ?? true;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
