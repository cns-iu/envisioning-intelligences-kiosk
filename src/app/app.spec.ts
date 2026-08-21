import { MatDialog } from '@angular/material/dialog';
import { render } from '@testing-library/angular';
import { App } from './app';
import { appConfig } from './app.config';
import { AboutService } from './services/about.service';

describe('App', () => {
  it('renders', async () => {
    const result = render(App, { providers: appConfig.providers });
    await expect(result).resolves.toBeDefined();
  });

  it('loads YAML content and opens the piece modal', async () => {
    const data = { types: ['human'], sections: [] };
    const load = vi.fn().mockResolvedValue(data);
    const open = vi.fn();
    const result = await render(App, {
      providers: [
        ...appConfig.providers,
        { provide: AboutService, useValue: { load } },
        { provide: MatDialog, useValue: { open } },
      ],
    });

    await result.fixture.componentInstance.openFile('/content/test.yml');

    expect(open).toHaveBeenCalledWith(expect.anything(), { data });
  });
});
