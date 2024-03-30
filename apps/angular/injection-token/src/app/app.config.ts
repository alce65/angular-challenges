import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

export const DEFAULT_TIMER = new InjectionToken<number>('DEFAULT_TIMER');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'video' },
      {
        path: 'video',
        loadComponent: () => import('./components/video.component'),
      },
      {
        path: 'phone',
        loadComponent: () => import('./components/phone.component'),
      },
    ]),
    {
      provide: DEFAULT_TIMER,
      useValue: 1000,
    },
  ],
};
