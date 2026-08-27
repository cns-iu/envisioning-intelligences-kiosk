import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceArray } from '@angular/cdk/coercion';
import { afterNextRender, assertInInjectionContext, DestroyRef, inject, Injector } from '@angular/core';
import { MatRippleLoader } from '@angular/material/core';

/** CSS class applied to ripples created for managed interactive elements. */
export const INTERACTIVE_ELEMENT_RIPPLE_CLASS = 'app-envisioning-intelligences--ripple';

/** Construction options for {@link InteractiveElementManager}. */
export interface InteractiveElementManagerOptions {
  /** Injector used to resolve the manager's Angular dependencies and destruction scope. */
  injector?: Injector;
  /** Whether the ripples created for managed elements should be centered. */
  centeredRipples?: boolean;
}

/**
 * Adds focus-origin monitoring and Material ripples to a managed collection of elements.
 *
 * The manager ignores duplicate additions and automatically removes all enhancements when the
 * associated Angular injection context is destroyed.
 */
export class InteractiveElementManager {
  /** Applies and removes focus-origin classes on managed elements. */
  readonly #focusMonitor: FocusMonitor;

  /** Creates and destroys Material ripples on managed elements. */
  readonly #rippleLoader: MatRippleLoader;

  /** Elements currently enhanced by this manager. */
  readonly #interactiveElements = new Set<HTMLElement>();

  /**
   * Creates an interactive element manager associated with an Angular destruction scope.
   *
   * When provided, the initial-element callback runs after the next render so view queries and
   * other render-dependent element references are available.
   *
   * @param getInitialElements - Resolves one or more elements to add after the next render.
   * @param options - Optional construction settings.
   */
  constructor(
    getInitialElements?: () => HTMLElement | HTMLElement[],
    readonly options?: InteractiveElementManagerOptions,
  ) {
    if (!options?.injector) {
      assertInInjectionContext(InteractiveElementManager);
    }

    const injector = options?.injector ?? inject(Injector);
    const destroyRef = injector.get(DestroyRef);

    this.#focusMonitor = injector.get(FocusMonitor);
    this.#rippleLoader = injector.get(MatRippleLoader);

    if (getInitialElements) {
      afterNextRender(() => this.addAll(coerceArray(getInitialElements())), { injector });
    }

    destroyRef.onDestroy(() => this.clear());
  }

  /**
   * Adds focus monitoring and a centered Material ripple to an element.
   *
   * Adding an element that is already managed has no effect.
   *
   * @param element - Element to enhance.
   */
  add(element: HTMLElement): void {
    if (this.#interactiveElements.has(element)) {
      return;
    }

    this.#focusMonitor.monitor(element, true);
    this.#rippleLoader.configureRipple(element, {
      className: INTERACTIVE_ELEMENT_RIPPLE_CLASS,
      centered: this.options?.centeredRipples ?? true,
    });
    this.#interactiveElements.add(element);
  }

  /**
   * Adds multiple elements to the managed collection.
   *
   * @param elements - Elements to enhance.
   */
  addAll(elements: HTMLElement[]): void {
    elements.forEach((element) => this.add(element));
  }

  /**
   * Removes focus monitoring and the Material ripple from an element.
   *
   * Removing an element that is not managed has no effect.
   *
   * @param element - Element whose enhancements should be removed.
   */
  remove(element: HTMLElement): void {
    if (!this.#interactiveElements.has(element)) {
      return;
    }

    this.#focusMonitor.stopMonitoring(element);
    this.#rippleLoader.destroyRipple(element);
    this.#interactiveElements.delete(element);
  }

  /**
   * Removes multiple elements from the managed collection.
   *
   * @param elements - Elements whose enhancements should be removed.
   */
  removeAll(elements: HTMLElement[]): void {
    elements.forEach((element) => this.remove(element));
  }

  /** Removes enhancements from every managed element. */
  clear(): void {
    this.removeAll(Array.from(this.#interactiveElements));
  }
}
