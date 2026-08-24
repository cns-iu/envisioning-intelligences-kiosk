import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, viewChild } from '@angular/core';
import { MatRippleLoader } from '@angular/material/core';
import { render, waitFor } from '@testing-library/angular';
import { EMPTY } from 'rxjs';
import { INTERACTIVE_ELEMENT_RIPPLE_CLASS, InteractiveElementManager } from './interactive-element-manager';

/** Hosts a manager whose initial element depends on a view query. */
@Component({ template: '<button #initialElement>Initial element</button>' })
class InitialElementHost {
  /** Element registered with the manager after the host's initial render. */
  readonly initialElement = viewChild.required<ElementRef<HTMLElement>>('initialElement');

  /** Manager under test, created within the host's injection context. */
  readonly manager = new InteractiveElementManager(() => this.initialElement().nativeElement);
}

describe('InteractiveElementManager', () => {
  /**
   * Creates observable focus and ripple collaborators.
   *
   * @returns Provider mocks used to verify the manager's effects.
   */
  function createCollaborators() {
    const focusMonitor = {
      monitor: vi.fn(() => EMPTY),
      stopMonitoring: vi.fn(),
    };
    const rippleLoader = {
      configureRipple: vi.fn(),
      destroyRipple: vi.fn(),
    };

    return { focusMonitor, rippleLoader };
  }

  /**
   * Renders the test host with observable focus and ripple collaborators.
   *
   * @returns The Testing Library render result and provider mocks.
   */
  async function setup() {
    const collaborators = createCollaborators();
    const renderResult = await render(InitialElementHost, {
      providers: [
        { provide: FocusMonitor, useValue: collaborators.focusMonitor },
        { provide: MatRippleLoader, useValue: collaborators.rippleLoader },
      ],
    });

    return { ...renderResult, ...collaborators, injector: renderResult.fixture.debugElement.injector };
  }

  it('adds initial elements after rendering and cleans them up with its injection context', async () => {
    const { fixture, focusMonitor, getByRole, rippleLoader } = await setup();
    const element = getByRole('button');

    await waitFor(() => expect(focusMonitor.monitor).toHaveBeenCalledWith(element, true));
    expect(rippleLoader.configureRipple).toHaveBeenCalledWith(element, {
      centered: true,
      className: INTERACTIVE_ELEMENT_RIPPLE_CLASS,
    });

    vi.clearAllMocks();
    fixture.destroy();

    expect(focusMonitor.stopMonitoring).toHaveBeenCalledOnce();
    expect(focusMonitor.stopMonitoring).toHaveBeenCalledWith(element);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledOnce();
    expect(rippleLoader.destroyRipple).toHaveBeenCalledWith(element);
  });

  it('adds each element once', async () => {
    const { injector, focusMonitor, rippleLoader } = await setup();
    const manager = new InteractiveElementManager(undefined, { injector });
    const firstElement = document.createElement('button');
    const secondElement = document.createElement('a');

    vi.clearAllMocks();
    manager.add(firstElement);
    manager.addAll([firstElement, secondElement]);

    expect(focusMonitor.monitor).toHaveBeenCalledTimes(2);
    expect(focusMonitor.monitor).toHaveBeenCalledWith(firstElement, true);
    expect(focusMonitor.monitor).toHaveBeenCalledWith(secondElement, true);
    expect(rippleLoader.configureRipple).toHaveBeenCalledTimes(2);
    expect(rippleLoader.configureRipple).toHaveBeenCalledWith(firstElement, {
      centered: true,
      className: INTERACTIVE_ELEMENT_RIPPLE_CLASS,
    });
  });

  it('only removes managed elements', async () => {
    const { injector, focusMonitor, rippleLoader } = await setup();
    const manager = new InteractiveElementManager(undefined, { injector });
    const firstElement = document.createElement('button');
    const secondElement = document.createElement('button');
    const unmanagedElement = document.createElement('button');

    manager.addAll([firstElement, secondElement]);
    vi.clearAllMocks();

    manager.remove(unmanagedElement);
    manager.remove(firstElement);
    manager.removeAll([firstElement, secondElement]);

    expect(focusMonitor.stopMonitoring).toHaveBeenCalledTimes(2);
    expect(focusMonitor.stopMonitoring).toHaveBeenCalledWith(firstElement);
    expect(focusMonitor.stopMonitoring).toHaveBeenCalledWith(secondElement);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledTimes(2);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledWith(firstElement);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledWith(secondElement);
  });

  it('clears all managed elements', async () => {
    const { injector, focusMonitor, rippleLoader } = await setup();
    const manager = new InteractiveElementManager(undefined, { injector });
    const elements = [document.createElement('button'), document.createElement('button')];

    manager.addAll(elements);
    vi.clearAllMocks();
    manager.clear();
    manager.clear();

    expect(focusMonitor.stopMonitoring).toHaveBeenCalledTimes(2);
    expect(rippleLoader.destroyRipple).toHaveBeenCalledTimes(2);
  });

  it('requires an injection context when no injector is provided', () => {
    expect(() => new InteractiveElementManager()).toThrow();
  });
});
