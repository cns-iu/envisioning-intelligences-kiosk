import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { App } from './app';
import { appConfig } from './app.config';
import { ExhibitStore } from './exhibit/exhibit.store';

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
      routes: [
        { path: '', component: RouteStub },
        { path: 'exhibit/:id', component: RouteStub, title: 'Collective Intelligence' },
      ],
    });

    await navigate('/exhibit/collective-intelligence');
    expect(screen.getByText('Collective Intelligence')).toBeInTheDocument();

    await navigate('/');
    expect(screen.queryByText('Collective Intelligence')).not.toBeInTheDocument();
  });
});
