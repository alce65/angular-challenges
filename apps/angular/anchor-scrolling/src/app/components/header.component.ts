import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header>
      <h1><ng-content></ng-content></h1>
    </header>
  `,
  host: {
    class: 'block p-4 m-2',
  },
})
export class HeaderComponent {}
