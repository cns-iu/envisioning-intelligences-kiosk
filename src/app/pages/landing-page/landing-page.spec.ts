import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { render, screen, waitFor } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { Exhibit } from '../../exhibit/exhibit.model';
import AboutDialog from '../../services/about-dialog';
import { AppEvents } from '../../services/app-events';
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

  const open = vi.fn();

  async function setup(options: { exhibits?: Exhibit[]; largeScreen?: boolean } = {}) {
    const breakpointState = new BehaviorSubject<BreakpointState>({
      breakpoints: {
        [Breakpoints.Large]: options.largeScreen ?? false,
        [Breakpoints.XLarge]: false,
      },
      matches: options.largeScreen ?? false,
    });

    const renderResult = await render(LandingPage, {
      inputs: { exhibits: options.exhibits ?? [] },
      providers: [
        AppEvents,
        { provide: AboutDialog, useValue: { open } },
        { provide: BreakpointObserver, useValue: { observe: vi.fn(() => breakpointState) } },
      ],
    });

    return { ...renderResult, breakpointState };
  }

  beforeEach(() => {
    open.mockReset();
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

  it('renders an empty card container when the resolved collection is empty', async () => {
    await setup();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not render hidden exhibits', async () => {
    const hiddenExhibit: Exhibit = { ...EXHIBITS[0], hidden: true };
    await setup({ exhibits: [hiddenExhibit, EXHIBITS[1]] });

    expect(screen.queryByRole('link', { name: /Exhibit 1/ })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Exhibit 2/ })).toBeInTheDocument();
  });

  it('opens the collection About dialog without an exhibit title', async () => {
    const aboutExhibit: Exhibit = { ...EXHIBITS[0], id: 'exhibit', hidden: true };
    await setup({ exhibits: [aboutExhibit, EXHIBITS[1]] });

    TestBed.inject(AppEvents).dispatch('open-about');

    await waitFor(() => expect(open).toHaveBeenCalledWith(aboutExhibit, false));
  });

  it('does not open an About dialog when collection content is absent', async () => {
    await setup({ exhibits: EXHIBITS });

    TestBed.inject(AppEvents).dispatch('open-about');

    expect(open).not.toHaveBeenCalled();
  });
});
