/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  BUTTON_STATE_TOKEN,
  ButtonState,
} from '@angular-challenges/decoupling/core';
import { Directive, WritableSignal, forwardRef, signal } from '@angular/core';

// Gracias al token BUTTON_STATE_TOKEN,
// BtnDisabledDirective puede ser independiente de BtnHelmetDirective

// BtnDisabledDirective actúa como provider de una instancia de ella misma
// cuando un inyector solicita BUTTON_STATE_TOKEN,

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  providers: [
    {
      provide: BUTTON_STATE_TOKEN,
      useExisting: forwardRef(() => BtnDisabledDirective),
    },
  ],
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
