import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <h1 class="px-4 py-2 text-xl">My Application</h1>
    <section class="flex">
      <div class="side">
        <router-outlet name="side" />
      </div>

      <div class="border p-4">
        <router-outlet />
      </div>
    </section>
  `,
  host: {
    class: 'flex flex-col gap-2',
  },
  styles: `
    .side {
      width: 20%;
      border: 1px solid #ccc;
    }
  `,
})
export class AppComponent {}
