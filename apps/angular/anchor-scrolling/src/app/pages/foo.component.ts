import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header.component';
import { NavButtonComponent } from '../components/nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, HeaderComponent],
  selector: 'app-foo',
  template: `
    <app-header>Foo Page</app-header>
    Welcome to foo page
    <nav-button href="home" class="fixed left-1/2 top-3">Home Page</nav-button>
    <div class="h-screen bg-blue-200">section 1</div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
