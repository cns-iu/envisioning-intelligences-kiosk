import { Route } from '@angular/router';
import { exhibitByIdResolver, exhibitsResolver, exhibitTitleResolver } from './exhibit/exhibit.resolvers';

/** Top-level routes for the landing page, exhibit details, and unknown URLs. */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Envisioning Intelligences',
    loadComponent: () => import('./pages/landing-page/landing-page'),
    resolve: { exhibits: exhibitsResolver },
  },
  {
    path: 'exhibit/:id',
    title: exhibitTitleResolver,
    loadComponent: () => import('./pages/exhibit-page/exhibit-page'),
    resolve: { exhibit: exhibitByIdResolver },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
