import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-embedded-visualization',
  imports: [],
  templateUrl: './embedded-visualization.html',
  styleUrl: './embedded-visualization.scss',
})
export class EmbeddedVisualization {
  readonly sanitizer = inject(DomSanitizer);

  readonly visualizationUrl = input.required<string>();

  protected readonly iframeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.visualizationUrl()));
}
