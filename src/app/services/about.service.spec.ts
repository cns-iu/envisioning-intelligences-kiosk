import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { render } from '@testing-library/angular';
import { AboutService } from './about.service';

@Component({
  template: '',
  providers: [AboutService],
})
class TestHost {
  readonly service = inject(AboutService);
}

describe('AboutService', () => {
  const dialog = {
    open: vi.fn(),
  };

  async function renderService() {
    const result = await render(TestHost, {
      providers: [{ provide: MatDialog, useValue: dialog }],
    });

    return result.fixture.componentInstance.service;
  }

  afterEach(() => {
    vi.restoreAllMocks();
    dialog.open.mockClear();
  });

  it('parses YAML content into an object', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('title: Test\nyear: 2026\ntypes:\n  - human')));

    const service = await renderService();

    await expect(service.load('/content/test.yml')).resolves.toEqual({
      title: 'Test',
      year: 2026,
      types: ['human'],
    });
  });

  it('throws when the content request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 404, statusText: 'Not Found' })));

    const service = await renderService();

    await expect(service.load('/content/missing.yml')).rejects.toThrow('Failed to load content: 404 Not Found');
  });

  it('loads content and opens the about modal', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('title: Test\ntypes:\n  - human')));

    const service = await renderService();

    await service.openFile('/content/test.yml');

    expect(dialog.open).toHaveBeenCalledWith(expect.anything(), {
      data: { title: 'Test', types: ['human'] },
    });
  });
});
