import { Component, inject, input } from '@angular/core';
import { KioskCard } from '../../components/kiosk-card/kiosk-card';
import { KioskCardContainer } from '../../components/kiosk-card/kiosk-card-container/kiosk-card-container';
import { Exhibit } from '../../models/exhibit';
import { ExhibitStore } from '../../services/exhibit-store';

@Component({
  selector: 'app-landing-page',
  imports: [KioskCard, KioskCardContainer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export default class LandingPage {
  readonly exhibitStore = inject(ExhibitStore);
  readonly exhibits = input<Exhibit[]>();

  constructor() {
    this.exhibitStore.currentExhibit.set(undefined);
  }
}
