import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, isActive, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

/** Hosts the application header and the currently active routed page. */
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** Whether the current URL belongs to an exhibit detail page. */
  protected readonly isExhibitPage = isActive('/exhibit', inject(Router));

  /**
   * Finds the deepest title defined in the active route snapshot tree.
   *
   * @param activatedRoute - Root of the active route tree to inspect.
   * @returns The most specific resolved route title, or `undefined` when no route defines one.
   */
  protected getTitle(activatedRoute: ActivatedRoute): string | undefined {
    let title: string | undefined = undefined;
    let currentRoute: ActivatedRouteSnapshot | null = activatedRoute.snapshot;

    while (currentRoute) {
      title = currentRoute.title ?? title;
      currentRoute = currentRoute.firstChild;
    }

    return title;
  }
}
