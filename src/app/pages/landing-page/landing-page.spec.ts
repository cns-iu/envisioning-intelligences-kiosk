import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { render, screen } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { Exhibit } from '../../exhibit/exhibit.model';
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
      providers: [{ provide: BreakpointObserver, useValue: { observe: vi.fn(() => breakpointState) } }],
    });

    return { ...renderResult, breakpointState };
  }

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
});
