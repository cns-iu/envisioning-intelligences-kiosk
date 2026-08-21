import { AboutService } from './about.service';

describe('AboutService', () => {
  const service = new AboutService();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('parses YAML content into an object', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('title: Test\nyear: 2026\ntypes:\n  - human')));

    await expect(service.load('/content/test.yml')).resolves.toEqual({
      title: 'Test',
      year: 2026,
      types: ['human'],
    });
  });

  it('throws when the content request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 404, statusText: 'Not Found' })));

    await expect(service.load('/content/missing.yml')).rejects.toThrow('Failed to load content: 404 Not Found');
  });
});
