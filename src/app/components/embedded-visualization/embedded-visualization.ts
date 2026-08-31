import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Embeds an external visualization in an iframe for the specified URL.
 */
@Component({
  selector: 'app-embedded-visualization',
  imports: [],
  templateUrl: './embedded-visualization.html',
  styleUrl: './embedded-visualization.scss',
  host: { class: 'app-embedded-visualization' },
})
export class EmbeddedVisualization {
  /** URL of the visualization to embed. */
  readonly url = input.required<string>();

  /** Sanitizer for bypassing security checks. */
  readonly #sanitizer = inject(DomSanitizer);

  /** Sanitized URL for the iframe. */
  protected readonly iframeUrl = computed(() => this.#sanitizer.bypassSecurityTrustResourceUrl(this.url()));
}
