import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HeavyComputationPipe } from './pipes/heavy-computation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, HeavyComputationPipe],
  selector: 'app-root',
  template: `
    <h2>Heavy computation pipe</h2>
    @for (person of persons(); track $index) {
      <p>
        {{ person | heavyComputation: $index }}
      </p>
    }
  `,
  styles: `
    p {
      color: blue;
      border: 1px solid #ccc;
      padding: 0.5rem;
    }
  `,
})
export class AppComponent {
  persons = signal(['jack toto', 'pepe perez', 'el chavo del 8']);

  // heavyComputation(name: string, index: number) {
  //   // very heavy computation
  //   return `${name} - ${index}`;
  // }
}
