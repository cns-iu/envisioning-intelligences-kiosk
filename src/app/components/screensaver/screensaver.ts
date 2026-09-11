import { coerceArray } from '@angular/cdk/coercion';
import { Component, computed, effect, input, linkedSignal } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Logo } from '../logo/logo';
import { TouchIcon } from './touch-icon/touch-icon';

/** The amount of time each piece of screensaver content remains visible. */
export const CONTENT_CYCLE_TIME_MS = 45 * 1000; // 45 seconds

/** Prompts shown when the screensaver consumer does not provide custom content. */
const SCREENSAVER_DEFAULT_CONTENT = [
  'What does intelligence look like when exhibited by humans or machines, plants or animals?',
  'How do different types of intelligence interact and cooperate in order to survive and thrive?',
];

/** Displays rotating prompts while the application is idle. */
@Component({
  selector: 'app-screensaver',
  imports: [Logo, MarkdownComponent, TouchIcon],
  templateUrl: './screensaver.html',
  styleUrl: './screensaver.scss',
  host: {
    class: 'app-screensaver',
    '[class.app-screensaver--active]': 'active()',
  },
})
export class Screensaver {
  /** Whether the screensaver is currently visible. */
  readonly active = input.required<boolean>();

  /** Content displayed by the screensaver in rotation order. */
  readonly content = input(SCREENSAVER_DEFAULT_CONTENT, { transform: coerceArray<string> });

  /** Currently selected prompt to render. */
  protected readonly currentContent = computed(() => {
    const content = this.content();
    const index = this.#currentContentIndex();
    return content[index];
  });

  /** Index of the displayed prompt, reset whenever the content input changes. */
  readonly #currentContentIndex = linkedSignal({
    source: this.content,
    computation: () => 0,
  });

  /** Starts content rotation while active and stops it when hidden or destroyed. */
  constructor() {
    effect((onCleanup) => {
      const active = this.active();
      if (!active) {
        return;
      }

      const intervalId = setInterval(() => {
        const length = this.content().length;
        this.#currentContentIndex.update((index) => (index + 1) % length);
      }, CONTENT_CYCLE_TIME_MS);

      onCleanup(() => clearInterval(intervalId));
    });
  }
}
