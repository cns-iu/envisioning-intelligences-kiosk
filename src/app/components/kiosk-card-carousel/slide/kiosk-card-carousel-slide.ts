import { Component, input } from '@angular/core';
import { Exhibit } from '../../../models/exhibit';
import { KioskCard } from '../../kiosk-card/kiosk-card';
import { KioskCardContainer } from '../../kiosk-card/kiosk-card-container/kiosk-card-container';

/** Renders one carousel page of exhibits as linked kiosk cards. */
@Component({
  selector: 'app-kiosk-card-carousel-slide',
  imports: [KioskCard, KioskCardContainer],
  templateUrl: './kiosk-card-carousel-slide.html',
  styleUrl: './kiosk-card-carousel-slide.scss',
})
export class KioskCardCarouselSlide {
  /** Exhibits rendered in this slide. */
  readonly exhibits = input.required<Exhibit[]>();

  /** Whether this is the initially visible slide whose images should load with priority. */
  readonly isFirstSlide = input(false);
}
