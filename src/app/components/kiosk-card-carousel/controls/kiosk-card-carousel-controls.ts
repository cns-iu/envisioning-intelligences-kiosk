import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkObserveContent } from '@angular/cdk/observers';
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatRippleLoader } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { SwiperOptions } from 'swiper/types';

/** CSS class Swiper applies to each generated pagination bullet. */
export const PAGINATION_BULLET_CLASS = 'swiper-pagination-bullet';

/** CSS class applied to the Material ripple attached to each pagination bullet. */
export const PAGINATION_BULLET_RIPPLE_CLASS = 'app-kiosk-card-carousel-controls--pagination-bullet-ripple';

/**
 * Determines whether a DOM node is a Swiper pagination bullet.
 *
 * @param node - Node to inspect.
 * @returns Whether the node is an HTML element with Swiper's pagination bullet class.
 */
function isPaginationBullet(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.classList.contains(PAGINATION_BULLET_CLASS);
}

/**
 * Renders the carousel navigation and pagination controls and exposes their Swiper configuration.
 *
 * Pagination bullets are created by Swiper, so the component observes the pagination container and
 * adds Angular Material focus monitoring and ripples as bullets enter or leave the DOM.
 */
@Component({
  selector: 'app-kiosk-card-carousel-controls',
  imports: [CdkObserveContent, MatIconButton, MatIcon],
  templateUrl: './kiosk-card-carousel-controls.html',
  styleUrl: './kiosk-card-carousel-controls.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-kiosk-card-carousel-controls' },
})
export class KioskCardCarouselControls {
  /** Reference to the button Swiper uses to advance the carousel. */
  private readonly nextEl = viewChild.required('nextEl', { read: ElementRef });

  /** Reference to the button Swiper uses to move the carousel backward. */
  private readonly prevEl = viewChild.required('prevEl', { read: ElementRef });

  /** Container in which Swiper renders pagination bullets. */
  private readonly paginationContainerEl = viewChild.required('paginationContainerEl', { read: ElementRef });

  /** Applies and removes focus-origin classes on dynamically generated bullets. */
  readonly #focusMonitor = inject(FocusMonitor);

  /** Creates and destroys Material ripples on dynamically generated bullets. */
  readonly #rippleLoader = inject(MatRippleLoader);

  /** Bullets currently enhanced with focus monitoring and a Material ripple. */
  readonly #paginationBullets = new Set<HTMLElement>();

  /**
   * Swiper navigation and pagination options bound to this component's rendered elements.
   *
   * The computed value becomes available after the required view queries resolve.
   */
  readonly config = computed(
    (): SwiperOptions => ({
      navigation: {
        nextEl: this.nextEl().nativeElement,
        prevEl: this.prevEl().nativeElement,
      },
      pagination: {
        type: 'bullets',
        clickable: true,
        el: this.paginationContainerEl().nativeElement,
      },
    }),
  );

  /** Initializes enhancements for generated bullets and registers their cleanup. */
  constructor() {
    afterNextRender(() => {
      const initialBullets = this.#getInitialPaginationBullets();
      this.#addPaginationBullets(initialBullets);
    });

    inject(DestroyRef).onDestroy(() => this.#removePaginationBullets(this.#paginationBullets));
  }

  /**
   * Enhances newly rendered pagination bullets and cleans up bullets removed by Swiper.
   *
   * @param mutations - Content mutations emitted for the pagination container.
   */
  protected onPaginationContentChange(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type !== 'childList') {
        continue;
      }

      this.#addPaginationBullets(mutation.addedNodes);
      this.#removePaginationBullets(mutation.removedNodes);
    }
  }

  /**
   * Finds pagination bullets already rendered before content observation begins.
   *
   * @returns The pagination bullets currently in the pagination container.
   */
  #getInitialPaginationBullets(): NodeListOf<HTMLElement> {
    const el = this.paginationContainerEl().nativeElement as HTMLElement;
    return el.querySelectorAll<HTMLElement>(`.${PAGINATION_BULLET_CLASS}`);
  }

  /**
   * Adds focus monitoring and a Material ripple to untracked pagination bullets.
   *
   * @param nodes - Candidate nodes added to the pagination container.
   */
  #addPaginationBullets(nodes: Iterable<Node>): void {
    const bullets = Array.from(nodes)
      .filter(isPaginationBullet)
      .filter((bullet) => !this.#paginationBullets.has(bullet));

    for (const bullet of bullets) {
      this.#paginationBullets.add(bullet);
      this.#focusMonitor.monitor(bullet, true);
      this.#rippleLoader.configureRipple(bullet, {
        centered: true,
        className: PAGINATION_BULLET_RIPPLE_CLASS,
      });
    }
  }

  /**
   * Removes focus monitoring and Material ripples from tracked pagination bullets.
   *
   * @param nodes - Candidate nodes removed from the pagination container or cleaned up on destroy.
   */
  #removePaginationBullets(nodes: Iterable<Node>): void {
    const bullets = Array.from(nodes)
      .filter(isPaginationBullet)
      .filter((bullet) => this.#paginationBullets.has(bullet));

    for (const bullet of bullets) {
      this.#paginationBullets.delete(bullet);
      this.#focusMonitor.stopMonitoring(bullet);
      this.#rippleLoader.destroyRipple(bullet);
    }
  }
}
