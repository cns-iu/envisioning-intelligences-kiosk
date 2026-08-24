import { CdkObserveContent } from '@angular/cdk/observers';
import { Component, computed, ElementRef, viewChild, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SwiperOptions } from 'swiper/types';
import { InteractiveElementManager } from '../../../shared/interactive-element-manager';

/** CSS class Swiper applies to each generated pagination bullet. */
export const PAGINATION_BULLET_CLASS = 'swiper-pagination-bullet';

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
 * Selects Swiper pagination bullets from an iterable of candidate nodes.
 *
 * @param nodes - Candidate nodes emitted by content observation or queried after rendering.
 * @returns HTML elements carrying Swiper's pagination bullet class.
 */
function coercePaginationBulletArray(nodes: Iterable<Node>): HTMLElement[] {
  return Array.from(nodes).filter(isPaginationBullet);
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

  /** Adds focus and ripple behavior to initial and dynamically rendered pagination bullets. */
  readonly #interactiveElementManager = new InteractiveElementManager(() => {
    const el = this.paginationContainerEl().nativeElement as HTMLElement;
    const initialBullets = el.querySelectorAll<HTMLElement>(`.${PAGINATION_BULLET_CLASS}`);
    return coercePaginationBulletArray(initialBullets);
  });

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

      const addedBullets = coercePaginationBulletArray(mutation.addedNodes);
      this.#interactiveElementManager.addAll(addedBullets);

      const removedBullets = coercePaginationBulletArray(mutation.removedNodes);
      this.#interactiveElementManager.removeAll(removedBullets);
    }
  }
}
