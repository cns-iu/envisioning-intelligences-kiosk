import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KioskCardCarousel } from '../../components/kiosk-card-carousel/kiosk-card-carousel';
import { KioskCard } from '../../components/kiosk-card/kiosk-card';
import { KioskCardContainer } from '../../components/kiosk-card/kiosk-card-container/kiosk-card-container';
import { Exhibit } from '../../exhibit/exhibit.model';

/** Displays the exhibit collection in a layout adapted to the current viewport size. */
@Component({
  selector: 'app-landing-page',
  imports: [KioskCard, KioskCardCarousel, KioskCardContainer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export default class LandingPage {
  /** Exhibit collection resolved before the landing page is activated. */
  readonly exhibits = input.required<Exhibit[]>();

  /** Whether the viewport matches a large or extra-large Material breakpoint. */
  protected readonly isLargeScreen = signal(false);

  /** Starts observing viewport changes for responsive exhibit layout selection. */
  constructor() {
    inject(BreakpointObserver)
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => this.isLargeScreen.set(result.matches));
  }
}
