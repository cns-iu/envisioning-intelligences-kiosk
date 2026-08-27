import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { ExhibitStore } from '../../services/exhibit-store';
import { exhibitPageTitleResolver } from './exhibit-page-title';

describe('exhibitPageTitleResolver', () => {
  /** Creates the minimum route snapshot required by the title resolver. */
  function createRoute(id?: string): ActivatedRouteSnapshot {
    return { paramMap: convertToParamMap(id ? { id } : {}) } as ActivatedRouteSnapshot;
  }

  /** Runs the resolver inside the Angular injection context used by `toObservable`. */
  function resolveTitle(id?: string): string | Observable<string> {
    return TestBed.runInInjectionContext(
      () => exhibitPageTitleResolver(createRoute(id), {} as RouterStateSnapshot) as string | Observable<string>,
    );
  }

  /** Configures an isolated exhibit store and returns its controllable collaborators. */
  function setup() {
    const isLoading = signal(false);
    const getExhibitById = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ExhibitStore,
          useValue: { exhibits: { isLoading }, getExhibitById },
        },
      ],
    });

    return { isLoading, getExhibitById };
  }

  it('returns an empty title when the route has no exhibit ID', () => {
    const { getExhibitById } = setup();

    expect(resolveTitle()).toBe('');
    expect(getExhibitById).not.toHaveBeenCalled();
  });

  it('resolves the matching exhibit title after loading completes', async () => {
    const { isLoading, getExhibitById } = setup();
    getExhibitById.mockReturnValue({ title: 'Collective Intelligence' });
    isLoading.set(true);

    const resolvedTitle = firstValueFrom(resolveTitle('collective-intelligence') as Observable<string>);
    isLoading.set(false);

    await expect(resolvedTitle).resolves.toBe('Collective Intelligence');
    expect(getExhibitById).toHaveBeenCalledWith('collective-intelligence');
  });

  it('returns an empty title when the exhibit is unknown', async () => {
    const { getExhibitById } = setup();
    getExhibitById.mockReturnValue(undefined);

    await expect(firstValueFrom(resolveTitle('unknown') as Observable<string>)).resolves.toBe('');
  });
});
