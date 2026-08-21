import { Component } from '@angular/core';
import { KioskCard } from '../../components/kiosk-card/kiosk-card';
import { KioskCardContainer } from '../../components/kiosk-card/kiosk-card-container/kiosk-card-container';

@Component({
  selector: 'app-landing-page',
  imports: [KioskCard, KioskCardContainer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export default class LandingPage {
  // TODO get exhibit title and set on header
}
