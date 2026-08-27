import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Exhibit } from './exhibit.model';
import { ExhibitStore } from './exhibit.store';

/**
 * Finds the loaded exhibit identified by a route snapshot.
 *
 * @param route Snapshot containing the optional exhibit ID route parameter.
 * @returns The indexed exhibit, or `undefined` when the ID is absent or unknown.
 */
function getExhibitForRoute(route: ActivatedRouteSnapshot): Exhibit | undefined {
  const store = inject(ExhibitStore);
  const id = route.paramMap.get('id');
  return id ? store.exhibitById().get(id) : undefined;
}

/** Resolves the loaded exhibit collection for the landing-page route input. */
export const exhibitsResolver: ResolveFn<Exhibit[]> = () => inject(ExhibitStore).exhibits();

/**
 * Resolves the document title for an exhibit route.
 *
 * @param route Snapshot containing the exhibit ID route parameter.
 * @returns The matching exhibit title, or an empty title for an absent or unknown ID.
 */
export const exhibitTitleResolver: ResolveFn<string> = (route) => getExhibitForRoute(route)?.title ?? '';

/**
 * Resolves the exhibit required by the detail-page route input.
 *
 * @param route Snapshot containing the exhibit ID route parameter.
 * @returns The exhibit matching the route ID.
 * @throws {Error} When the route ID is absent, unknown, or identifies a hidden exhibit.
 */
export const exhibitByIdResolver: ResolveFn<Exhibit> = (route) => {
  const exhibit = getExhibitForRoute(route);
  if (!exhibit || exhibit.hidden) {
    const id = route.paramMap.get('id');
    throw new Error(`Exhibit with id ${id} ${exhibit ? 'is hidden' : 'not found'}`);
  }

  return exhibit;
};
