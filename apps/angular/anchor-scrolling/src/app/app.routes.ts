import { Route } from '@angular/router';
import { FooComponent } from './pages/foo.component';
import { HomeComponent } from './pages/home.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'foo', component: FooComponent },
  { path: '**', redirectTo: 'home' },
];
