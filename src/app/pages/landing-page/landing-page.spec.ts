import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { Exhibit } from '../../models/exhibit';
import { ExhibitStore } from '../../services/exhibit-store';
import LandingPage from './landing-page';

describe('LandingPage', () => {
  const EXHIBITS = Array.from(
    { length: 9 },
    (_, index): Exhibit => ({
      id: `exhibit-${index + 1}`,
      title: `Exhibit ${index + 1}`,
      description: `Description ${index + 1}`,
      year: 2026,
      cardImageUrl: `assets/exhibit-${index + 1}.png`,
      intelligenceTypes: ['human'],
      visualizationUrl: `visualization-${index + 1}`,
    }),
  );

  /** Renders the page with controllable exhibit-resource and breakpoint state. */
  async function setup(options: { exhibits?: Exhibit[]; loading?: boolean; largeScreen?: boolean } = {}) {
    const exhibitValue = signal<Exhibit[] | undefined>(options.exhibits);
    const loading = signal(options.loading ?? false);
    const breakpointState = new BehaviorSubject<BreakpointState>({
      breakpoints: {
        [Breakpoints.Large]: options.largeScreen ?? false,
        [Breakpoints.XLarge]: false,
      },
      matches: options.largeScreen ?? false,
    });
    const exhibits = {
      hasValue: () => exhibitValue() !== undefined,
      value: () => exhibitValue() ?? [],
      isLoading: () => loading(),
    };

    const renderResult = await render(LandingPage, {
      providers: [
        { provide: ExhibitStore, useValue: { exhibits } },
        { provide: BreakpointObserver, useValue: { observe: vi.fn(() => breakpointState) } },
      ],
    });

    return { ...renderResult, breakpointState, exhibitValue, loading };
  }

  it('shows a progress indicator while exhibits are loading', async () => {
    await setup({ loading: true });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders exhibits directly on smaller screens', async () => {
    await setup({ exhibits: EXHIBITS });

    expect(screen.getAllByRole('link')).toHaveLength(EXHIBITS.length);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Exhibit 1/ })).toHaveAttribute('href', '/exhibit/exhibit-1');
  });

  it('renders a carousel when a large screen has more than eight exhibits', async () => {
    await setup({ exhibits: EXHIBITS, largeScreen: true });

    expect(screen.getAllByRole('link')).toHaveLength(EXHIBITS.length);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders no exhibits or progress indicator after loading fails', async () => {
    await setup();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
