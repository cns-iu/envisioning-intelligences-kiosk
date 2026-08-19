import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, viewChild, ViewEncapsulation } from '@angular/core';
import { register, SwiperContainer } from 'swiper/element';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { KioskCardCarouselControls } from './controls/kiosk-card-carousel-controls';

const SWIPER_CONFIG: SwiperOptions = {
  a11y: true,
  keyboard: true,
  loop: true,
  modules: [A11y, Keyboard, Navigation, Pagination],
  // TODO
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
  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainer>>('swiperEl');
  private readonly controls = viewChild.required(KioskCardCarouselControls);

  constructor() {
    register();

    effect(() => {
      const el = this.swiperEl().nativeElement;
      const controls = this.controls();

      Object.assign(el, SWIPER_CONFIG, controls.config());
      el.initialize();
    });
  }
}
