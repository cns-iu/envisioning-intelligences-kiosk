import { Component, computed, inject } from '@angular/core';
import { KioskCardContainer } from '../../components/kiosk-card/kiosk-card-container/kiosk-card-container';
import { KioskCard } from '../../components/kiosk-card/kiosk-card';
import { AboutModal } from '../../components/about-modal/about-modal';
import { MatDialog } from '@angular/material/dialog';
import { ExhibitStore } from '../../services/exhibit-store';

@Component({
  selector: 'app-landing-page',
  imports: [KioskCard, KioskCardContainer],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export default class LandingPage {
  readonly dialog = inject(MatDialog);
  readonly exhibitStore = inject(ExhibitStore);

  protected readonly exhibit = computed(() => {
    return this.exhibitStore.exhibits.value().find((ex) => ex.id === 'envisioning-intelligences');
  });

  openAbout(): void {
    this.dialog.open(AboutModal, {
      data: this.exhibit(),
    });
  }
}
