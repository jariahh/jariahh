import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog as MatDialog, MatDialogConfig as MatDialogConfig } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationResult } from './confirmation.model';

@Directive({
  selector: '[libConfirmation]'
})
export class ConfirmationDirective {
  @Input() libConfirmation: any;
  @Input() confirmationMessage = '';
  @Input() confirmationTitle = '';
  @Input() okButtonLabel = '';
  @Input() cancelButtonLabel = '';
  @Input() icon = '';
  constructor(private matDialog: MatDialog) { }

  @HostListener('click')
  public clickListener() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'common-dialog-container';
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: this.confirmationTitle,
      message1: this.confirmationMessage,
      message2: '',
      okButtonLabel: this.okButtonLabel,
      cancelButtonLabel: this.cancelButtonLabel,
      icon: this.icon
    };
    this.matDialog.open(ConfirmationDialogComponent, dialogConfig).afterClosed().pipe(tap((result: ConfirmationResult) => {
      if (result?.okay) {
        this.libConfirmation();
      }
    })).subscribe();
  }
}
