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
import { KioskCardCarouselControls } from './controls/kiosk-card-carousel-controls';
import { KioskCardCarouselSlide } from './slide/kiosk-card-carousel-slide';

const SWIPER_CONFIG: SwiperOptions = {
  a11y: true,
  keyboard: true,
  loop: true,
  observer: true,
  slidesPerView: 1,
  modules: [A11y, Keyboard, Navigation, Pagination],
};

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
  readonly cards = input.required<unknown[]>();
  readonly cardsPerSlide = input(8);

  protected readonly groupedCards = computed(() => {
    const slides = this.cards();
    const step = this.cardsPerSlide();
    const length = Math.ceil(slides.length / step);
    return Array.from({ length }, (_, i) => slides.slice(i * step, (i + 1) * step));
  });

  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainer>>('swiperEl');
  private readonly controls = viewChild.required(KioskCardCarouselControls);

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
