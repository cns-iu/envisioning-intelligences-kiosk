import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, of, take, timer } from 'rxjs';

interface LoadingProgressState {
  progress: number;
  done: boolean;
}

const LOADING_DONE_STATE: LoadingProgressState = { progress: 100, done: true };

/**
 * Embeds an external visualization in an iframe for the specified URL.
 */
@Component({
  selector: 'app-embedded-visualization',
  imports: [MatProgressSpinner],
  templateUrl: './embedded-visualization.html',
  styleUrl: './embedded-visualization.scss',
  host: { class: 'app-embedded-visualization' },
})
export class EmbeddedVisualization {
  /** URL of the visualization to embed. */
  readonly url = input.required<string>();

  readonly loadingDurationMs = input(0, { transform: (value: number | undefined) => value ?? 0 });

  /** Sanitized URL for the iframe. */
  protected readonly iframeUrl = computed(() => this.#sanitizer.bypassSecurityTrustResourceUrl(this.url()));

  protected readonly isLoading = computed(() => !this.#loadingProgressState.value().done);

  protected readonly loadingProgress = computed(() => this.#loadingProgressState.value().progress);

  /** Sanitizer for bypassing security checks. */
  readonly #sanitizer = inject(DomSanitizer);

  readonly #loadingProgressState = rxResource({
    params: () => ({
      shouldLoad: this.url() !== '' && this.loadingDurationMs() > 0,
      durationMs: this.loadingDurationMs(),
    }),
    stream: ({ params }) => this.#createLoadingProgressStream(params.shouldLoad, params.durationMs),
    defaultValue: LOADING_DONE_STATE,
  });

  #createLoadingProgressStream(shouldLoad: boolean, durationMs: number): Observable<LoadingProgressState> {
    if (!shouldLoad) {
      return of(LOADING_DONE_STATE);
    }

    const LOADING_TICK_MS = 100;
    const numTicks = Math.ceil(durationMs / LOADING_TICK_MS);
    return timer(0, LOADING_TICK_MS).pipe(
      take(numTicks),
      map((tick) => {
        const progress = Math.round((100 * (tick + 1)) / numTicks);
        const done = tick + 1 >= numTicks;
        return { progress, done };
      }),
    );
  }
}
