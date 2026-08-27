import { Component, ErrorHandler } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { of } from 'rxjs';
import { App } from './app';
import { appConfig } from './app.config';
import { ExhibitStore } from './exhibit/exhibit.store';
import { AppEvents } from './services/app-events';

@Component({ template: '' })
class RouteStub {}

describe('App', () => {
  it('loads exhibits during startup and renders the application', async () => {
    const loadExhibits = vi.fn(() => of([]));
    const result = await render(App, {
      providers: [
        appConfig.providers,
        {
          provide: ExhibitStore,
          useValue: { exhibits: () => [], exhibitById: () => new Map(), loadExhibits },
        },
      ],
    });

    expect(result).toBeDefined();
    expect(loadExhibits).toHaveBeenCalledOnce();
  });

  it('shows the resolved title only on exhibit routes', async () => {
    const { navigate } = await render(App, {
      providers: [MarkdownService],
      routes: [
        { path: '', component: RouteStub },
        { path: 'exhibit/:id', component: RouteStub, title: 'Collective Intelligence' },
      ],
    });

    await navigate('/exhibit/collective-intelligence');
    expect(await screen.findByText('Collective Intelligence')).toBeInTheDocument();

    await navigate('/');
    expect(screen.queryByText('Collective Intelligence')).not.toBeInTheDocument();
  });

  it('dispatches an open-about event from the header action', async () => {
    const dispatch = vi.fn();
    await render(App, {
      routes: [{ path: '', component: RouteStub }],
      providers: [{ provide: AppEvents, useValue: { dispatch } }],
    });

    fireEvent.click(screen.getByRole('button', { name: 'About' }));

    expect(dispatch).toHaveBeenCalledWith('open-about');
  });

  it('reports route resolution errors and redirects home', async () => {
    const handleError = vi.fn();
    const { navigate } = await render(App, {
      providers: [
        appConfig.providers,
        { provide: ErrorHandler, useValue: { handleError } },
        {
          provide: ExhibitStore,
          useValue: { exhibits: () => [], exhibitById: () => new Map(), loadExhibits: () => of([]) },
        },
      ],
    });

    await navigate('/exhibit/missing');

    expect(handleError).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({ message: 'Exhibit with id missing not found' }),
      }),
    );
    expect(window.location.pathname).toBe('/');
  });
});
