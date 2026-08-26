import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResolveFn, Route } from '@angular/router';
import { filter, map } from 'rxjs';
import { Exhibit } from './models/exhibit';
import { ExhibitStore } from './services/exhibit-store';

function exhibitsResolver(): ResolveFn<Exhibit[]> {
  return () => {
    const exhibitStore = inject(ExhibitStore);
    return toObservable(exhibitStore.exhibits.status).pipe(
      filter((status) => status === 'resolved'),
      map(() => exhibitStore.exhibits.value()),
    );
  };
}

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Envisioning Intelligences',
    resolve: {
      exhibits: exhibitsResolver(),
    },
    loadComponent: () => import('./pages/landing-page/landing-page'),
  },
  {
    path: 'exhibit/:id',
    resolve: {
      exhibits: exhibitsResolver(),
    },
    loadComponent: () => import('./pages/exhibit-page/exhibit-page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
