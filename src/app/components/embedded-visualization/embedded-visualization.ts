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
})
export class EmbeddedVisualization {
  /** Sanitizer for bypassing security checks. */
  readonly sanitizer = inject(DomSanitizer);

  /** URL of the visualization to embed. */
  readonly visualizationUrl = input.required<string>();

  /** Sanitized visualization URL */
  protected readonly iframeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.visualizationUrl()));
}
