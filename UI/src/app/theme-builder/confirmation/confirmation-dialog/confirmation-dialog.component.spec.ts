import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let spectator: Spectator<ConfirmationDialogComponent>;
  const createComponent = createComponentFactory(ConfirmationDialogComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
