import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { ConfirmationDirective } from './confirmation.directive';

describe('ConfirmationDirective', () => {
  let spectator: SpectatorDirective<ConfirmationDirective>;
  const createDirective = createDirectiveFactory(ConfirmationDirective);

  it('should change the background color', () => {
    spectator = createDirective(`<div highlight>Testing ConfirmationDirective</div>`);

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

});
