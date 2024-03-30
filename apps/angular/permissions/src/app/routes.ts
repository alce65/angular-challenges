import { canMatchPermissions } from './guards/can-match-permissions.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => canMatchPermissions(['ADMIN'])],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatchPermissions(['MANAGER'])],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/user.component'),
  },
];
