import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  host: { class: 'dashboard-user' },
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <h2>dashboard for other users works!</h2>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserDashboardComponent {}
