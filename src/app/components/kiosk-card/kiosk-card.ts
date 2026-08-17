import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

/** Type of work featured in card */
export type WorkType = 'visualization' | 'video';

/**
 * KioskCard component displays a card with an image, title, type of work, and a button that links to a specified route.
 */
@Component({
  selector: 'app-kiosk-card',
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './kiosk-card.html',
  styleUrl: './kiosk-card.scss',
})
export class KioskCard {
  /** Image url */
  readonly image = input<string>('assets/card-placeholder.png');
  /** Card title */
  readonly title = input.required<string>();
  /** Type of work */
  readonly type = input.required<WorkType>();
  /** Router link for the button */
  readonly link = input.required<string>();
}
