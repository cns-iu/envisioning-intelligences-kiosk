import { FocusMonitor } from '@angular/cdk/a11y';
import { Renderer2 } from '@angular/core';
import { MatRippleLoader } from '@angular/material/core';
import { render, waitFor } from '@testing-library/angular';
import { EMPTY } from 'rxjs';
import {
  KioskCardCarouselControls,
  PAGINATION_BULLET_CLASS,
  PAGINATION_BULLET_RIPPLE_CLASS,
} from './kiosk-card-carousel-controls';

describe('KioskCardCarouselControls', () => {
  /**
   * Renders the controls with observable focus and ripple collaborators.
   *
   * @returns The Testing Library render result and frequently used test utilities.
   */
  async function setup() {
    const focusMonitor = {
      focusVia: vi.fn(),
      monitor: vi.fn(() => EMPTY),
      stopMonitoring: vi.fn(),
    };
    const rippleLoader = {
      configureRipple: vi.fn(),
      destroyRipple: vi.fn(),
      setDisabled: vi.fn(),
    };
    const renderResult = await render(KioskCardCarouselControls, {
      providers: [
        { provide: FocusMonitor, useValue: focusMonitor },
        { provide: MatRippleLoader, useValue: rippleLoader },
      ],
    });
    const component = renderResult.fixture.componentInstance;
    const renderer = renderResult.debugElement.injector.get(Renderer2);

    vi.clearAllMocks();

    return { ...renderResult, component, focusMonitor, renderer, rippleLoader };
  }

  /**
   * Returns the element in which Swiper renders pagination bullets.
   *
   * @param component - Rendered carousel controls instance.
   * @returns The configured pagination container.
   */
  function getPaginationContainer(component: KioskCardCarouselControls): HTMLElement {
    const pagination = component.config().pagination;

    if (!pagination || typeof pagination === 'boolean' || !(pagination.el instanceof HTMLElement)) {
      throw new Error('Expected the pagination config to reference an HTML element.');
    }

    return pagination.el;
  }

  /**
   * Creates a Swiper pagination bullet through Angular's rendering abstraction.
   *
   * @param renderer - Renderer associated with the controls fixture.
   * @returns A new pagination bullet element.
   */
  function createPaginationBullet(renderer: Renderer2): HTMLElement {
    const bullet = renderer.createElement('button') as HTMLElement;
    renderer.addClass(bullet, PAGINATION_BULLET_CLASS);
    return bullet;
  }

  it('configures Swiper with its rendered controls', async () => {
    const { component, getAllByRole } = await setup();
    const [previousButton, nextButton] = getAllByRole('button');
    const paginationContainer = getPaginationContainer(component);

    expect(component.config()).toMatchObject({
      navigation: {
        nextEl: nextButton,
        prevEl: previousButton,
      },
      pagination: {
        clickable: true,
        el: paginationContainer,
        type: 'bullets',
      },
    });
  });

  it('enhances added pagination bullets and cleans them up when removed', async () => {
    const { component, focusMonitor, renderer, rippleLoader } = await setup();
    const paginationContainer = getPaginationContainer(component);
    const bullet = createPaginationBullet(renderer);
    const unrelatedElement = renderer.createElement('span') as HTMLElement;

    renderer.appendChild(paginationContainer, unrelatedElement);
    renderer.appendChild(paginationContainer, bullet);

    await waitFor(() => expect(focusMonitor.monitor).toHaveBeenCalledWith(bullet, true));
    expect(focusMonitor.monitor).toHaveBeenCalledTimes(1);
    expect(rippleLoader.configureRipple).toHaveBeenCalledWith(bullet, {
      centered: true,
      className: PAGINATION_BULLET_RIPPLE_CLASS,
    });
    expect(rippleLoader.configureRipple).toHaveBeenCalledTimes(1);

    renderer.removeChild(paginationContainer, unrelatedElement);
    renderer.removeChild(paginationContainer, bullet);

    await waitFor(() => expect(focusMonitor.stopMonitoring).toHaveBeenCalledWith(bullet));
    expect(focusMonitor.stopMonitoring).toHaveBeenCalledTimes(1);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledWith(bullet);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledTimes(1);
  });

  it('ignores pagination mutations that do not add or remove children', async () => {
    const { component, focusMonitor, renderer, rippleLoader } = await setup();
    const paginationContainer = getPaginationContainer(component);
    const text = renderer.createText('initial content');
    const bullet = createPaginationBullet(renderer);

    renderer.appendChild(paginationContainer, text);
    renderer.setValue(text, 'updated content');
    renderer.appendChild(paginationContainer, bullet);

    await waitFor(() => expect(focusMonitor.monitor).toHaveBeenCalledWith(bullet, true));
    expect(focusMonitor.monitor).toHaveBeenCalledTimes(1);
    expect(rippleLoader.configureRipple).toHaveBeenCalledTimes(1);
  });

  it('cleans up enhanced pagination bullets when destroyed', async () => {
    const { component, fixture, focusMonitor, renderer, rippleLoader } = await setup();
    const paginationContainer = getPaginationContainer(component);
    const bullet = createPaginationBullet(renderer);

    renderer.appendChild(paginationContainer, bullet);
    await waitFor(() => expect(focusMonitor.monitor).toHaveBeenCalledWith(bullet, true));
    vi.clearAllMocks();

    fixture.destroy();

    expect(focusMonitor.stopMonitoring).toHaveBeenCalledWith(bullet);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledWith(bullet);
  });
});
