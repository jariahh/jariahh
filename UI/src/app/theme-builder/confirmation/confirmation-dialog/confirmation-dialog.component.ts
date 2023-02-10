import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationResult } from '../confirmation.model';

@Component({
  selector: 'lib-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  icon = '';
  title = '';
  message1 = '';
  message2 = '';
  okButtonLabel = 'Ok';
  otherOptionLabel = null;
  cancelButtonLabel = 'Cancel';
  isOkayOnly = true;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.icon = data.icon;
    this.message1 = data.message1;
    this.message2 = data.message2;
    this.okButtonLabel = data.okButtonLabel == '' ? 'Ok' : data.okButtonLabel;
    this.otherOptionLabel ??= data.otherOptionLabel;
    this.cancelButtonLabel = data.cancelButtonLabel == '' ? 'Cancel' : data.cancelButtonLabel;
    this.isOkayOnly = data.isOkayOnly ?? false;
  }

  cancelClicked() {
    this.closeDialog({
      cancel: true
    });
  }

  okayClicked() {
    this.closeDialog({
      okay: true
    });
  }

  private closeDialog(result: ConfirmationResult) {
    this.dialogRef.close(result);
  }
}
