import {
  afterNextRender,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { register, SwiperContainer } from 'swiper/element';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { Exhibit } from '../../models/exhibit';
import { KioskCardCarouselControls } from './controls/kiosk-card-carousel-controls';
import { KioskCardCarouselSlide } from './slide/kiosk-card-carousel-slide';

/** Base Swiper behavior shared by every kiosk card carousel instance. */
const SWIPER_CONFIG: SwiperOptions = {
  a11y: true,
  keyboard: true,
  loop: true,
  observer: true,
  slidesPerView: 1,
  modules: [A11y, Keyboard, Navigation, Pagination],
};

/**
 * Renders a carousel of exhibit cards grouped into slides, with navigation and pagination controls.
 */
@Component({
  selector: 'app-kiosk-card-carousel',
  imports: [KioskCardCarouselControls, KioskCardCarouselSlide],
  templateUrl: './kiosk-card-carousel.html',
  styleUrl: './kiosk-card-carousel.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-kiosk-card-carousel' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class KioskCardCarousel {
  /** Exhibits displayed by the carousel. */
  readonly exhibits = input.required<Exhibit[]>();

  /** Maximum number of exhibit cards rendered in each slide. */
  readonly cardsPerSlide = input(8);

  /** Exhibits partitioned into ordered, fixed-size slide groups. */
  protected readonly groupedExhibits = computed(() => {
    const slides = this.exhibits();
    const step = this.cardsPerSlide();
    const length = Math.ceil(slides.length / step);
    return Array.from({ length }, (_, i) => slides.slice(i * step, (i + 1) * step));
  });

  /** Rendered Swiper custom element initialized after the component view is ready. */
  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainer>>('swiperEl');

  /** Rendered controls whose element references are supplied to Swiper. */
  private readonly controls = viewChild.required(KioskCardCarouselControls);

  /** Registers Swiper's custom elements and initializes the rendered carousel after its first render. */
  constructor() {
    register();

    afterNextRender(() => {
      const el = this.swiperEl().nativeElement;
      const controls = this.controls();

      Object.assign(el, SWIPER_CONFIG, controls.config());
      el.initialize();
    });
  }
}
