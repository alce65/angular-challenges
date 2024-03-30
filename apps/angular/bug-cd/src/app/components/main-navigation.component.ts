import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { FakeServiceService } from '../fake.service';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
    <!-- <ng-container *ngFor="let menu of menus">
      <a
        class="rounded-md border px-4 py-2"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
        {{ menu.name }}
      </a>
    </ng-container> -->

    @for (menu of menus; track menu.path) {
      <a
        class="rounded-md border px-4 py-2"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
        {{ menu.name }}
      </a>
    }
  `,
  styles: [
    `
      a.isSelected {
        @apply bg-gray-600 text-white;
      }
    `,
  ],
  host: {
    class: 'flex flex-col p-2 gap-2',
  },
})
export class NavigationComponent {
  @Input() menus!: MenuItem[];
}

@Component({
  standalone: true,
  imports: [NavigationComponent, NgIf, AsyncPipe],
  template: `
    <!-- <ng-container *ngIf="info$ | async as info">
      <ng-container *ngIf="info !== null; else noInfo">
        <app-nav [menus]="getMenu(info)" />
      </ng-container>
    </ng-container>

    <ng-template #noInfo>
      <app-nav [menus]="getMenu('')" />
    </ng-template> -->

    @if (info$ | async; as info) {
      <app-nav [menus]="info.menu" />
    }
  `,
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);

  readonly info$ = this.fakeBackend
    .getInfoFromBackend()
    .pipe(
      map((info) =>
        info === null
          ? { menu: this._getMenu(''), info }
          : { menu: this._getMenu(info), info },
      ),
    );

  private _getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
