import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error-info',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h2>Error {{ error().status }}</h2>
    <p>Status message; {{ error().statusText }}</p>
    <p>Error message: {{ error().message }}</p>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid red;
      background-color: #fdd;
    }
  `,
})
export class ErrorInfoComponent {
  error = input.required<HttpErrorResponse>();
}
