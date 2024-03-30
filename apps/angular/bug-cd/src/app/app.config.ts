import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BarComponent } from './components/bar.component';
import { FooComponent } from './components/foo.component';
import { MainNavigationComponent } from './components/main-navigation.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        component: MainNavigationComponent,
        outlet: 'side',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'foo',
      },
      {
        path: 'foo',
        component: FooComponent,
      },
      {
        path: 'bar',
        component: BarComponent,
      },
    ]),
  ],
};
