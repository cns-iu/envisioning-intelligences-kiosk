import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ZodError } from 'zod';
import { ExhibitStore, provideExhibitStoreConfig } from './exhibit.store';

describe('ExhibitStore', () => {
  const DEFAULT_DATA_URL = 'data/exhibits.yaml';
  const CUSTOM_DATA_URL = 'assets/test/exhibits.yaml';

  const VALID_EXHIBITS_YAML = `
- id: collective-intelligence
  title: Collective Intelligence
  description: A study of distributed problem-solving.
  year: 2026
  thumbnailUrl: assets/images/collective-intelligence.webp
  intelligenceTypes:
    - human
    - artificial-machine
  videoId: abc123
  hidden: true
`;

  const INVALID_EXHIBITS_YAML = `
- id: invalid-exhibit
  title: Invalid exhibit
  description: Its year does not satisfy the exhibit schema.
  year: -1
  thumbnailUrl: assets/images/invalid.webp
  intelligenceTypes:
    - animal
`;

  async function flushExhibitRequest(
    dataUrl: string,
    responseBody: string,
    beforeFlush?: (store: ExhibitStore, request: TestRequest) => void,
  ): Promise<{ exhibits: ReturnType<ExhibitStore['exhibits']>; store: ExhibitStore }> {
    const store = TestBed.inject(ExhibitStore);
    const httpTesting = TestBed.inject(HttpTestingController);
    const result = firstValueFrom(store.loadExhibits());

    const request = httpTesting.expectOne({ method: 'GET', url: dataUrl });
    beforeFlush?.(store, request);
    request.flush(responseBody);

    return { exhibits: await result, store };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('uses the default data URL and exposes an empty collection before loading', async () => {
    const { exhibits, store } = await flushExhibitRequest(DEFAULT_DATA_URL, '[]', (loadingStore) => {
      expect(loadingStore.config).toEqual({ dataUrl: DEFAULT_DATA_URL });
      expect(loadingStore.exhibits()).toEqual([]);
    });

    expect(exhibits).toEqual([]);
    expect(store.exhibits()).toEqual([]);
  });

  it('loads and validates exhibits from a configured YAML document', async () => {
    TestBed.configureTestingModule({
      providers: [provideExhibitStoreConfig({ dataUrl: CUSTOM_DATA_URL })],
    });
    const { exhibits, store } = await flushExhibitRequest(CUSTOM_DATA_URL, VALID_EXHIBITS_YAML, (_store, request) => {
      expect(request.request.responseType).toBe('text');
    });

    expect(exhibits).toEqual([
      {
        id: 'collective-intelligence',
        title: 'Collective Intelligence',
        description: 'A study of distributed problem-solving.',
        year: 2026,
        thumbnailUrl: 'assets/images/collective-intelligence.webp',
        intelligenceTypes: ['human', 'artificial-machine'],
        videoId: 'abc123',
        hidden: true,
      },
    ]);
    expect(store.exhibits()).toEqual(exhibits);
  });

  it('indexes exhibits by ID after the collection loads', async () => {
    const store = TestBed.inject(ExhibitStore);

    expect(store.exhibitById().size).toBe(0);

    await flushExhibitRequest(DEFAULT_DATA_URL, VALID_EXHIBITS_YAML);

    expect(store.exhibitById().get('collective-intelligence')).toMatchObject({
      id: 'collective-intelligence',
      title: 'Collective Intelligence',
    });
    expect(store.exhibitById().get('unknown')).toBeUndefined();
  });

  it('rejects schema validation failures without replacing the collection', async () => {
    const store = TestBed.inject(ExhibitStore);
    const result = firstValueFrom(store.loadExhibits());
    const request = TestBed.inject(HttpTestingController).expectOne({ method: 'GET', url: DEFAULT_DATA_URL });

    request.flush(INVALID_EXHIBITS_YAML);

    await expect(result).rejects.toBeInstanceOf(ZodError);
    expect(store.exhibits()).toEqual([]);
  });
});
