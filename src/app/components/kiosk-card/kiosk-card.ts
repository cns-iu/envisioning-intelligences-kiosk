import { CommonModule, NgOptimizedImage } from '@angular/common';
import { booleanAttribute, Component, ElementRef, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { InteractiveElementManager } from '../../shared/interactive-element-manager';

/** Supported work categories displayed by a kiosk card. */
export type WorkType = 'visualization' | 'video';

/** Presents a linked work preview with an optimized image and category label. */
@Component({
  selector: 'app-kiosk-card',
  imports: [CommonModule, MatButtonModule, RouterLink, NgOptimizedImage],
  templateUrl: './kiosk-card.html',
  styleUrl: './kiosk-card.scss',
  host: { class: 'app-kiosk-card' },
})
export class KioskCard {
  /** URL of the card image, or the placeholder asset when omitted. */
  readonly image = input<string>('assets/card-placeholder.png');
  /** Human-readable title of the linked work. */
  readonly title = input.required<string>();
  /** Category shown over the card image. */
  readonly type = input.required<WorkType>();
  /** Application route opened when the card is activated. */
  readonly link = input.required<string>();
  /** Whether Angular should prioritize loading this card's image. */
  readonly priority = input(false, { transform: booleanAttribute });

  /** Rendered link enhanced with focus-origin styles and a Material ripple. */
  private readonly cardButton = viewChild.required('cardButton', { read: ElementRef });

  /** Registers the rendered card link with the shared interaction manager. */
  constructor() {
    new InteractiveElementManager(() => this.cardButton().nativeElement, { centeredRipples: false });
  }
}
