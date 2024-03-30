import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, startWith } from 'rxjs';
import { DEFAULT_TIMER } from './app.config';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  timer = toSignal(interval(inject(DEFAULT_TIMER)).pipe(startWith(0)));
}
