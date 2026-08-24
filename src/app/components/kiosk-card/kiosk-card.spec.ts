import { FocusMonitor } from '@angular/cdk/a11y';
import { MatRippleLoader } from '@angular/material/core';
import { render, screen, waitFor } from '@testing-library/angular';
import { EMPTY } from 'rxjs';
import { INTERACTIVE_ELEMENT_RIPPLE_CLASS } from '../../shared/interactive-element-manager';
import { KioskCard } from './kiosk-card';

describe('KioskCard', () => {
  /**
   * Renders a kiosk card with observable focus and ripple collaborators.
   *
   * @param inputs - Input values that override the default card fixture.
   * @returns The render result and interaction collaborator mocks.
   */
  async function setup(inputs: Record<string, unknown> = {}) {
    const focusMonitor = {
      monitor: vi.fn(() => EMPTY),
      stopMonitoring: vi.fn(),
    };
    const rippleLoader = {
      configureRipple: vi.fn(),
      destroyRipple: vi.fn(),
    };
    const renderResult = await render(KioskCard, {
      inputs: {
        title: 'Deep Time Stories',
        type: 'visualization',
        link: '/works/deep-time',
        ...inputs,
      },
      providers: [
        { provide: FocusMonitor, useValue: focusMonitor },
        { provide: MatRippleLoader, useValue: rippleLoader },
      ],
    });

    return { ...renderResult, focusMonitor, rippleLoader };
  }

  it('renders the card image, title, and type label from the inputs', async () => {
    const { fixture } = await setup({ image: 'assets/demo-image.png' });

    expect(fixture.nativeElement).toHaveClass('app-kiosk-card');
    expect(screen.getByAltText('')).toHaveAttribute('src', 'assets/demo-image.png');
    expect(screen.getByText('Deep Time Stories')).toBeInTheDocument();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Deep Time Stories/ })).toHaveAttribute('href', '/works/deep-time');
  });

  it('uses the default image when inputs are not provided', async () => {
    await setup({ title: 'Default Work', link: '/works/default' });

    expect(screen.getByAltText('')).toHaveAttribute('src', 'assets/card-placeholder.png');
    expect(screen.getByRole('link', { name: /Default Work/ })).toHaveAttribute('href', '/works/default');
  });

  it('prioritizes the image when the boolean input is present', async () => {
    await setup({ priority: '' });

    expect(screen.getByAltText('')).toHaveAttribute('fetchpriority', 'high');
  });

  it('does not prioritize the image when the boolean input is the string false', async () => {
    await setup({ priority: 'false' });

    expect(screen.getByAltText('')).not.toHaveAttribute('fetchpriority', 'high');
  });

  it('enhances the card link and removes the enhancements when destroyed', async () => {
    const { fixture, focusMonitor, rippleLoader } = await setup();
    const link = screen.getByRole('link', { name: /Deep Time Stories/ });

    await waitFor(() => expect(focusMonitor.monitor).toHaveBeenCalledWith(link, true));
    expect(rippleLoader.configureRipple).toHaveBeenCalledWith(link, {
      centered: true,
      className: INTERACTIVE_ELEMENT_RIPPLE_CLASS,
    });

    vi.clearAllMocks();
    fixture.destroy();

    expect(focusMonitor.stopMonitoring).toHaveBeenCalledOnce();
    expect(focusMonitor.stopMonitoring).toHaveBeenCalledWith(link);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledOnce();
    expect(rippleLoader.destroyRipple).toHaveBeenCalledWith(link);
  });
});
