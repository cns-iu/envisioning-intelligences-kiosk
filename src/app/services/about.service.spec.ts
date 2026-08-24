import { Component, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { AboutModal } from '../components/about-modal/about-modal';
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

  async function setupService() {
    const result = await render(TestHost, {
      providers: [{ provide: MatDialog, useValue: dialog }, provideHttpClient(), provideHttpClientTesting()],
    });

    return {
      service: result.fixture.componentInstance.service,
      httpMock: TestBed.inject(HttpTestingController),
    };
  }

  afterEach(() => {
    dialog.open.mockClear();
  });

  it('requests yaml content and opens the about modal with parsed data', async () => {
    const { service, httpMock } = await setupService();

    service.openDialog('/content/test.yml');

    const req = httpMock.expectOne('/content/test.yml');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');

    req.flush(
      [
        'id: recollection',
        'title: "ReCollection: You Only Have Seven Seconds"',
        'year: 2023',
        'intelligenceTypes:',
        '  - artificial-machine',
        '  - human',
        'description: About description',
      ].join('\n'),
    );

    expect(dialog.open).toHaveBeenCalledWith(AboutModal, {
      data: {
        id: 'recollection',
        title: 'ReCollection: You Only Have Seven Seconds',
        year: 2023,
        intelligenceTypes: ['artificial-machine', 'human'],
        description: 'About description',
      },
    });

    httpMock.verify();
  });

  it('opens the modal when optional fields are not present', async () => {
    const { service, httpMock } = await setupService();

    service.openDialog('/content/about-minimal.yml');

    const req = httpMock.expectOne('/content/about-minimal.yml');
    req.flush(['id: minimal', 'intelligenceTypes:', '  - animal', 'description: Minimal description'].join('\n'));

    expect(dialog.open).toHaveBeenCalledWith(AboutModal, {
      data: {
        id: 'minimal',
        intelligenceTypes: ['animal'],
        description: 'Minimal description',
      },
    });

    httpMock.verify();
  });
});
