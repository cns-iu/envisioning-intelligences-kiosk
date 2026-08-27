import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, isActive, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { AppEvents } from './services/app-events';

/** Hosts the application header and the currently active routed page. */
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** Whether the current URL belongs to an exhibit detail page. */
  readonly #isExhibitPage = isActive('/exhibit', inject(Router));

  /** Root route used to discover the title of the active child route. */
  readonly #activatedRoute = inject(ActivatedRoute);

  /** Application event bus used to notify the active page about header actions. */
  readonly #events = inject(AppEvents);

  /** Most specific route title to display while viewing an exhibit. */
  protected readonly title = computed(() => {
    if (!this.#isExhibitPage()) {
      return undefined;
    }

    return this.#getTitle(this.#activatedRoute);
  });

  /** Requests that the active page open its contextual About dialog. */
  protected openAbout(): void {
    this.#events.dispatch('open-about');
  }

  /**
   * Finds the deepest title defined in the active route snapshot tree.
   *
   * @param activatedRoute - Root of the active route tree to inspect.
   * @returns The most specific resolved route title, or `undefined` when no route defines one.
   */
  #getTitle(activatedRoute: ActivatedRoute): string | undefined {
    let title: string | undefined = undefined;
    let currentRoute: ActivatedRouteSnapshot | null = activatedRoute.snapshot;

    while (currentRoute) {
      title = currentRoute.title ?? title;
      currentRoute = currentRoute.firstChild;
    }

    return title;
  }
}
