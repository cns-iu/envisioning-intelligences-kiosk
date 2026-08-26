import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResolveFn, Route } from '@angular/router';
import { filter, map } from 'rxjs';
import { Exhibit } from './models/exhibit';
import { ExhibitStore } from './services/exhibit-store';

function exhibitResolver(): ResolveFn<Exhibit | undefined> {
  return (route) => {
    const exhibitStore = inject(ExhibitStore);
    const exhibitId = route.paramMap.get('id') || '';
    return toObservable(exhibitStore.exhibits.status).pipe(
      filter((status) => status === 'resolved'),
      map(() => {
        return findExhibit(exhibitStore.exhibits.value(), exhibitId);
      }),
    );
  };
}

function findExhibit(exhibits: Exhibit[], id: string | null): Exhibit | undefined {
  return exhibits.find((ex) => ex.id === id);
}

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Envisioning Intelligences',
    loadComponent: () => import('./pages/landing-page/landing-page'),
  },
  {
    path: 'exhibit/:id',
    resolve: {
      exhibit: exhibitResolver(),
    },
    loadComponent: () => import('./pages/exhibit-page/exhibit-page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
