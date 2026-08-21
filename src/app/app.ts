import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AboutModal } from './components/about-modal/about-modal';
import { KioskCard } from './components/kiosk-card/kiosk-card';
import { KioskCardContainer } from './components/kiosk-card/kiosk-card-container/kiosk-card-container';
import { AboutService } from './services/about.service';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule, KioskCard, KioskCardContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly dialog = inject(MatDialog);
  private readonly about = inject(AboutService);

  async openFile(url: string): Promise<void> {
    const data = await this.about.load(url);
    this.dialog.open(AboutModal, { data });
  }
}
