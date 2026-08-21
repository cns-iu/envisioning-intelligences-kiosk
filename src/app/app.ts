import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AboutModal, AboutModalData } from './components/about-modal/about-modal';
import { KioskCard } from './components/kiosk-card/kiosk-card';
import { KioskCardContainer } from './components/kiosk-card/kiosk-card-container/kiosk-card-container';

const TestAffiliations = `
* Weidi Zhang, Media and Immersive eXperience (MIX) Center, Arizona State University
* Jieliang (Rodger) Luo, Minus AI`;
const TestReferences = `
* Zhang, Weidi, and Rodger Luo. 2023. “ReCollection.” Accessed February 23, 2026. [https://www.zhangweidi.com/recollection](https://www.zhangweidi.com/recollection).
* Zhang, Weidi, and Rodger Luo. 2023. *ReCollection: You Only Have Seven Seconds*. In *Envisioning Intelligences 3.1* (2025), edited by Katy Börner, Elizabeth G. Record, and Todd Theriault.`;
const TestDescription = `
*ReCollection* is a poetic, AI-generated documentary that visualizes fading memory at the intersection of remembrance and imagination. Against the backdrop of rising Alzheimer’s cases and the emergence of machine-generated false memories, the video reimagines remembrance through the lens of artificial intelligence.

Inspired by her grandmother’s cognitive decline, the artist created a custom AI system that transforms fragmented spoken recollections into synthetic visual sequences.
Originally presented as a public interactive AI art installation, *ReCollection* has welcomed thousands of visitors from around the world to whisper their fading memories—each within seven seconds—into the artwork and generate visual memories in real time. These visual memories—constructed through speech recognition, text auto-completion, and text-to-image generation—form the foundation of an evolving visual archive.`;

const TestData = {
  title: 'ReCollection: You Only Have Seven Seconds',
  year: 2023,
  types: ['AI Art', 'Interactive Installation', 'Video'],
  affiliations: TestAffiliations,
  description: TestDescription,
  references: TestReferences,
  main: true,
};

@Component({
  selector: 'app-root',
  imports: [RouterModule, KioskCard, KioskCardContainer, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly dialog = inject(MatDialog);
  private ref?: MatDialogRef<AboutModal>;

  open(): void {
    this.ref = this.dialog.open(AboutModal, {
      data: TestData satisfies AboutModalData,
    });
  }
}
