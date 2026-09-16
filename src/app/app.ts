import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, isActive, Router, RouterOutlet } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { Header } from './components/header/header';
import { Screensaver } from './components/screensaver/screensaver';
import { AppEvents } from './services/app-events';
import { ScreenSizeDialog } from './services/screen-size-dialog';
import { idleAfter } from './shared/idle-after';
import { IS_KIOSK_MODE } from './shared/kiosk-mode';

/** The amount of time in milliseconds to wait before activating the screensaver. */
export const IDLE_TIME_MS = 7 * 60 * 1000; // 7 minutes

/** Hosts the application header and the currently active routed page. */
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Screensaver],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** Router reference. */
  readonly #router = inject(Router);

  /** Dialog reference. */
  readonly #dialog = inject(MatDialog);

  /** Whether the current URL belongs to an exhibit detail page. */
  readonly #isExhibitPage = isActive('/exhibit', this.#router);

  /** Root route used to discover the title of the active child route. */
  readonly #activatedRoute = inject(ActivatedRoute);

  /** Application event bus used to notify the active page about header actions. */
  readonly #events = inject(AppEvents);

  /** Observable that emits when the user interacts with the application. */
  readonly #activity$ = merge(
    fromEvent(document, 'pointerup'),
    fromEvent(document, 'keydown'),
    fromEvent(document, 'wheel', { passive: true }),
  );

  /** Most specific route title to display while viewing an exhibit. */
  protected readonly title = computed(() => {
    if (!this.#isExhibitPage()) {
      return undefined;
    }

    return this.#getTitle(this.#activatedRoute);
  });

  /** Whether the screensaver is currently active. */
  protected readonly screensaverActive = toSignal(this.#activity$.pipe(idleAfter(IDLE_TIME_MS)), {
    initialValue: false,
  });

  /** Starts application-wide event monitoring. */
  constructor() {
    // Instantiate the root signal before routed components can request it.
    inject(IS_KIOSK_MODE);

    inject(ScreenSizeDialog).startMonitor();

    effect(() => {
      if (this.screensaverActive()) {
        this.#router.navigate(['/']);
        this.#dialog.closeAll();
      }
    });
  }

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
