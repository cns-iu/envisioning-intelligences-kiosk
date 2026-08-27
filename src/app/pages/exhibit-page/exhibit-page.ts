import { Component, inject, injectAsync, input, onIdle } from '@angular/core';
import { Exhibit } from '../../exhibit/exhibit.model';
import { EmbeddedVisualization } from '../../components/embedded-visualization/embedded-visualization';
import { EmbeddedYoutube } from '../../components/embedded-youtube/embedded-youtube';
import { AppEvents } from '../../services/app-events';

/** Renders the detail view for the exhibit selected by the current route. */
@Component({
  selector: 'app-exhibit-page',
  imports: [EmbeddedVisualization, EmbeddedYoutube],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
})
export default class ExhibitPage {
  /** Exhibit resolved from the current route. */
  readonly exhibit = input.required<Exhibit>();

  /** Lazily injected dialog controller used to display details for the active exhibit. */
  readonly #dialog = injectAsync(() => import('../../services/about-dialog'), { prefetch: onIdle });

  /** Subscribes to application-level About requests for this routed page. */
  constructor() {
    inject(AppEvents).on('open-about', () => this.#openDialog());
  }

  /**
   * Opens the About dialog for the exhibit resolved by the current route.
   *
   * @returns A promise that resolves after the dialog service loads and opens the modal.
   */
  async #openDialog(): Promise<void> {
    (await this.#dialog()).open(this.exhibit());
  }
}
