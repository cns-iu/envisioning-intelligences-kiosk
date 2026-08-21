import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Envisioning Intelligences',
    loadComponent: () => import('./pages/landing-page/landing-page'),
  },
  {
    path: 'exhibit/:id',
    title: '', // TODO: use resolver to set title
    loadComponent: () => import('./pages/exhibit-page/exhibit-page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
