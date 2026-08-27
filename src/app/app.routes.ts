import { Route } from '@angular/router';
import { exhibitPageTitleResolver } from './pages/exhibit-page/exhibit-page-title';

/** Top-level routes for the landing page, exhibit details, and unknown URLs. */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Envisioning Intelligences',
    loadComponent: () => import('./pages/landing-page/landing-page'),
  },
  {
    path: 'exhibit/:id',
    title: exhibitPageTitleResolver,
    loadComponent: () => import('./pages/exhibit-page/exhibit-page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
