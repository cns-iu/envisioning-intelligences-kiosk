import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResolveFn } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { ExhibitStore } from '../../services/exhibit-store';

/**
 * Resolves an exhibit route's document title after exhibit data finishes loading.
 *
 * @param route - Snapshot containing the exhibit ID route parameter.
 * @returns The matching exhibit title, or an empty string when the route or exhibit is unknown.
 */
export const exhibitPageTitleResolver: ResolveFn<string> = (route) => {
  const id = route.paramMap.get('id');
  if (!id) {
    return '';
  }

  const exhibitStore = inject(ExhibitStore);
  const isLoading$ = toObservable(exhibitStore.exhibits.isLoading);
  return isLoading$.pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => exhibitStore.getExhibitById(id)?.title ?? ''),
  );
};
