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
import { NavigationOptions, PaginationOptions, SwiperOptions } from 'swiper/types';

const PAGINATION_BULLET_CLASS = 'swiper-pagination-bullet';
const PAGINATION_BULLET_RIPPLE_CLASS = 'app-kiosk-card-carousel-controls--pagination-bullet-ripple';

const NAVIGATION_CONFIG: NavigationOptions = {
  addIcons: false,
};

const PAGINATION_CONFIG: PaginationOptions = {
  type: 'bullets',
  clickable: true,
};

function isPaginationBullet(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && node.classList.contains(PAGINATION_BULLET_CLASS);
}

@Component({
  selector: 'app-kiosk-card-carousel-controls',
  imports: [CdkObserveContent, MatIconButton, MatIcon],
  templateUrl: './kiosk-card-carousel-controls.html',
  styleUrl: './kiosk-card-carousel-controls.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-kiosk-card-carousel-controls' },
})
export class KioskCardCarouselControls {
  private readonly nextEl = viewChild.required('nextEl', { read: ElementRef });
  private readonly prevEl = viewChild.required('prevEl', { read: ElementRef });
  private readonly paginationContainerEl = viewChild.required('paginationContainerEl', { read: ElementRef });

  readonly #rippleLoader = inject(MatRippleLoader);
  readonly #paginationBullets = new Set<HTMLElement>();

  readonly config = computed(
    (): SwiperOptions => ({
      navigation: {
        ...NAVIGATION_CONFIG,
        nextEl: this.nextEl().nativeElement,
        prevEl: this.prevEl().nativeElement,
      },
      pagination: {
        ...PAGINATION_CONFIG,
        el: this.paginationContainerEl().nativeElement,
      },
    }),
  );

  constructor() {
    afterNextRender(() => {
      const initialBullets = this.#getInitialPaginationBullets();
      this.#addPaginationBullets(initialBullets);
    });

    inject(DestroyRef).onDestroy(() => this.#removePaginationBullets(this.#paginationBullets));
  }

  protected onPaginationContentChange(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type !== 'childList') {
        continue;
      }

      this.#addPaginationBullets(mutation.addedNodes);
      this.#removePaginationBullets(mutation.removedNodes);
    }
  }

  #getInitialPaginationBullets(): NodeListOf<HTMLElement> {
    const el = this.paginationContainerEl().nativeElement as HTMLElement;
    return el.querySelectorAll<HTMLElement>(`.${PAGINATION_BULLET_CLASS}`);
  }

  #addPaginationBullets(nodes: Iterable<Node>): void {
    const bullets = Array.from(nodes)
      .filter(isPaginationBullet)
      .filter((bullet) => !this.#paginationBullets.has(bullet));

    for (const bullet of bullets) {
      this.#paginationBullets.add(bullet);
      this.#rippleLoader.configureRipple(bullet, {
        className: PAGINATION_BULLET_RIPPLE_CLASS,
      });
    }
  }

  #removePaginationBullets(nodes: Iterable<Node>): void {
    const bullets = Array.from(nodes)
      .filter(isPaginationBullet)
      .filter((bullet) => this.#paginationBullets.has(bullet));

    for (const bullet of bullets) {
      this.#paginationBullets.delete(bullet);
      this.#rippleLoader.destroyRipple(bullet);
    }
  }
}
