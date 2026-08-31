import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { Exhibit } from './exhibit.model';
import { exhibitByIdResolver, exhibitsResolver, exhibitTitleResolver } from './exhibit.resolvers';
import { ExhibitStore } from './exhibit.store';

describe('exhibit resolvers', () => {
  const EXHIBITS: Exhibit[] = [
    {
      id: 'collective-intelligence',
      title: 'Collective Intelligence',
      description: 'A study of distributed problem-solving.',
      year: 2026,
      thumbnailUrl: 'assets/images/collective-intelligence.webp',
      intelligenceTypes: ['human', 'artificial-machine'],
    },
  ];

  function createRoute(id?: string): ActivatedRouteSnapshot {
    return { paramMap: convertToParamMap(id ? { id } : {}) } as ActivatedRouteSnapshot;
  }

  function resolve<T>(resolver: () => T): T {
    return TestBed.runInInjectionContext(resolver);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ExhibitStore,
          useValue: {
            exhibits: () => EXHIBITS,
            exhibitById: () => new Map(EXHIBITS.map((exhibit) => [exhibit.id, exhibit])),
          },
        },
      ],
    });
  });

  it('resolves the loaded exhibit collection', () => {
    const exhibits = resolve(() => exhibitsResolver(createRoute(), {} as RouterStateSnapshot));

    expect(exhibits).toBe(EXHIBITS);
  });

  it('resolves the matching exhibit title', () => {
    const title = resolve(() =>
      exhibitTitleResolver(createRoute('collective-intelligence'), {} as RouterStateSnapshot),
    );

    expect(title).toBe('Collective Intelligence');
  });

  it.each([undefined, 'unknown'])('uses an empty title for the route ID %s', (id) => {
    const title = resolve(() => exhibitTitleResolver(createRoute(id), {} as RouterStateSnapshot));

    expect(title).toBe('');
  });

  it('resolves the exhibit matching the route ID', () => {
    const exhibit = resolve(() =>
      exhibitByIdResolver(createRoute('collective-intelligence'), {} as RouterStateSnapshot),
    );

    expect(exhibit).toBe(EXHIBITS[0]);
  });

  it.each([undefined, 'unknown'])('rejects the unresolved route ID %s', (id) => {
    expect(() => resolve(() => exhibitByIdResolver(createRoute(id), {} as RouterStateSnapshot))).toThrow(
      `Exhibit with id ${id ?? 'null'} not found`,
    );
  });

  it('rejects a hidden exhibit', () => {
    const hiddenExhibit: Exhibit = { ...EXHIBITS[0], hidden: true };
    TestBed.overrideProvider(ExhibitStore, {
      useValue: {
        exhibits: () => [hiddenExhibit],
        exhibitById: () => new Map([[hiddenExhibit.id, hiddenExhibit]]),
      },
    });

    expect(() =>
      resolve(() => exhibitByIdResolver(createRoute('collective-intelligence'), {} as RouterStateSnapshot)),
    ).toThrow('Exhibit with id collective-intelligence is hidden');
  });
});
