import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kiosk-card-carousel-slide',
  imports: [],
  templateUrl: './kiosk-card-carousel-slide.html',
  styleUrl: './kiosk-card-carousel-slide.scss',
})
export class KioskCardCarouselSlide {
  readonly cards = input.required<unknown[]>();
}
