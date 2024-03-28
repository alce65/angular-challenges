import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component'),
  },
  {
    path: 'subscription/:testId',
    loadComponent: () => import('./pages/test.component'),
    data: {
      permission: 'admin',
    },
  },
];
