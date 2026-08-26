import { Component, input } from '@angular/core';
import { KioskCardContainer } from '../../components/kiosk-card/kiosk-card-container/kiosk-card-container';
import { KioskCard } from '../../components/kiosk-card/kiosk-card';
import { Exhibit } from '../../models/exhibit';

@Component({
  selector: 'app-landing-page',
  imports: [KioskCard, KioskCardContainer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export default class LandingPage {
  readonly exhibits = input<Exhibit[]>();
}
