import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header.component';
import { NavButtonComponent } from '../components/nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, HeaderComponent],
  selector: 'app-home',
  template: `
    <app-header>Home Page</app-header>
    <nav-button href="/foo" class="fixed left-1/2 top-3">Foo Page</nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button fragment="bottom">Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button fragment="top">Scroll Top</nav-button>
    </div>
  `,
  styles: `
    :host {
      display: block;
      scroll-behavior: smooth;
    }
  `,
})
export class HomeComponent {}
