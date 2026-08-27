import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ZodError } from 'zod';
import { ExhibitStore, provideExhibitStore } from './exhibit-store';

describe('ExhibitStore', () => {
  const DEFAULT_DATA_URL = 'data/exhibits.yaml';
  const CUSTOM_DATA_URL = 'assets/test/exhibits.yaml';

  const VALID_EXHIBITS_YAML = `
- id: collective-intelligence
  title: Collective Intelligence
  description: A study of distributed problem-solving.
  year: 2026
  cardImageUrl: assets/images/collective-intelligence.webp
  intelligenceTypes:
    - human
    - artificial-machine
  videoId: abc123
`;

  const INVALID_EXHIBITS_YAML = `
- id: invalid-exhibit
  title: Invalid exhibit
  description: Its year does not satisfy the exhibit schema.
  year: -1
  cardImageUrl: assets/images/invalid.webp
  intelligenceTypes:
    - animal
`;

  async function flushExhibitRequest(
    dataUrl: string,
    responseBody: string,
    beforeFlush?: (store: ExhibitStore, request: TestRequest) => void,
  ): Promise<ExhibitStore> {
    const store = TestBed.inject(ExhibitStore);
    const httpTesting = TestBed.inject(HttpTestingController);

    TestBed.tick();
    const request = httpTesting.expectOne({ method: 'GET', url: dataUrl });
    beforeFlush?.(store, request);
    request.flush(responseBody);
    await TestBed.inject(ApplicationRef).whenStable();

    return store;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('uses the default data URL and exposes no value while loading', async () => {
    const store = await flushExhibitRequest(DEFAULT_DATA_URL, '[]', (loadingStore) => {
      expect(loadingStore.config).toEqual({ dataUrl: DEFAULT_DATA_URL });
      expect(loadingStore.exhibits.value()).toBeUndefined();
    });

    expect(store.exhibits.value()).toEqual([]);
  });

  it('loads and validates exhibits from a configured YAML document', async () => {
    TestBed.configureTestingModule({
      providers: [provideExhibitStore({ dataUrl: CUSTOM_DATA_URL })],
    });
    const { exhibits } = await flushExhibitRequest(CUSTOM_DATA_URL, VALID_EXHIBITS_YAML, (_store, request) => {
      expect(request.request.responseType).toBe('text');
    });

    expect(exhibits.value()).toEqual([
      {
        id: 'collective-intelligence',
        title: 'Collective Intelligence',
        description: 'A study of distributed problem-solving.',
        year: 2026,
        cardImageUrl: 'assets/images/collective-intelligence.webp',
        intelligenceTypes: ['human', 'artificial-machine'],
        videoId: 'abc123',
      },
    ]);
  });

  it('looks up exhibits by ID after the collection loads', async () => {
    const store = TestBed.inject(ExhibitStore);

    expect(store.getExhibitById('collective-intelligence')).toBeUndefined();

    await flushExhibitRequest(DEFAULT_DATA_URL, VALID_EXHIBITS_YAML);

    expect(store.getExhibitById('collective-intelligence')).toMatchObject({
      id: 'collective-intelligence',
      title: 'Collective Intelligence',
    });
    expect(store.getExhibitById('unknown')).toBeUndefined();
  });

  it('exposes schema validation failures through the resource', async () => {
    const { exhibits } = await flushExhibitRequest(DEFAULT_DATA_URL, INVALID_EXHIBITS_YAML);

    expect(exhibits.error()).toBeInstanceOf(ZodError);
    expect(() => exhibits.value()).toThrow('Resource is currently in an error state');
  });
});
