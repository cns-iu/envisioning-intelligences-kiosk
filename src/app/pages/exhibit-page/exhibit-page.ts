import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component, inject, injectAsync, input, linkedSignal, onIdle } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { EmbeddedVideo } from '../../components/embedded-video/embedded-video';
import { EmbeddedVisualization } from '../../components/embedded-visualization/embedded-visualization';
import { Exhibit } from '../../exhibit/exhibit.model';
import { AppEvents } from '../../services/app-events';
import { createThumbnailUrl } from '../../shared/thumbnail-url';

/** Renders the detail view for the exhibit selected by the current route. */
@Component({
  selector: 'app-exhibit-page',
  imports: [EmbeddedVisualization, EmbeddedVideo, MatButton, NgOptimizedImage, RouterLink],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: ({ src, width }: ImageLoaderConfig) => createThumbnailUrl(src, width),
    },
  ],
})
export default class ExhibitPage {
  /** Exhibit resolved from the current route. */
  readonly exhibit = input.required<Exhibit>();

  /** Whether an error occurred while loading the exhibit. */
  readonly hasError = linkedSignal({
    source: this.exhibit,
    computation: () => false,
  });

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
