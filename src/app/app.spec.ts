import { Component, ErrorHandler } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { fireEvent, render, screen, type RenderComponentOptions } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { of } from 'rxjs';
import { App } from './app';
import { appConfig } from './app.config';
import { ExhibitStore } from './exhibit/exhibit.store';
import { AppEvents } from './services/app-events';

@Component({ template: '' })
class RouteStub {}

const IDLE_TIME_MS = 7 * 60 * 1000;
const DEFAULT_SCREENSAVER_PROMPT =
  'What does intelligence look like when exhibited by humans or machines, plants or animals?';

describe('App', () => {
  async function setup(options: RenderComponentOptions<App> = {}) {
    const { providers = [], routes = [{ path: '', component: RouteStub }], ...renderOptions } = options;

    return render(App, {
      ...renderOptions,
      providers: [MarkdownService, ...providers],
      routes,
    });
  }

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads exhibits during startup and renders the application', async () => {
    const loadExhibits = vi.fn(() => of([]));
    const result = await setup({
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
    const { navigate } = await setup({
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
    await setup({
      providers: [{ provide: AppEvents, useValue: { dispatch } }],
    });

    fireEvent.click(screen.getByRole('button', { name: 'About' }));

    expect(dispatch).toHaveBeenCalledWith('open-about');
  });

  it.each([
    ['pointer interaction', () => fireEvent.pointerDown(document)],
    ['keyboard interaction', () => fireEvent.keyDown(document, { key: 'Enter' })],
    ['wheel interaction', () => fireEvent.wheel(document)],
  ])('activates after seven idle minutes and dismisses on %s', async (_interaction, interact) => {
    vi.useFakeTimers();
    const { fixture } = await setup({
      deferBlockStates: DeferBlockState.Complete,
    });

    const prompt = screen.getByText(DEFAULT_SCREENSAVER_PROMPT);
    const screensaver = prompt.closest('app-screensaver');
    expect(screensaver).not.toHaveClass('app-screensaver--active');

    await vi.advanceTimersByTimeAsync(IDLE_TIME_MS);
    fixture.detectChanges();

    expect(screensaver).toHaveClass('app-screensaver--active');

    interact();
    fixture.detectChanges();

    expect(screensaver).not.toHaveClass('app-screensaver--active');
  });

  it('reports route resolution errors and redirects home', async () => {
    const handleError = vi.fn();
    const { navigate } = await setup({
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
