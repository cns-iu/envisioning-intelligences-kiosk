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
  imports: [KioskCardCarouselControls],
  templateUrl: './kiosk-card-carousel.html',
  styleUrl: './kiosk-card-carousel.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-kiosk-card-carousel' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class KioskCardCarousel {
  readonly slides = input.required<unknown[]>();
  readonly rows = input(2);
  readonly columns = input(4);

  protected readonly groupedSlides = computed(() => {
    const slides = this.slides();
    const step = this.rows() * this.columns();
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
