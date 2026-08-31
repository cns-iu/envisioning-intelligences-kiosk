import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { booleanAttribute, Component, ElementRef, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { InteractiveElementManager } from '../../shared/interactive-element-manager';

/** Supported work categories displayed by a kiosk card. */
export type WorkType = 'visualization' | 'video';

/** Regular expression to match the file extension of an image. */
const IMAGE_SUFFIX_REGEX = /(\.[^/.]+)$/;

/** Presents a linked work preview with an optimized image and category label. */
@Component({
  selector: 'app-kiosk-card',
  imports: [CommonModule, MatButtonModule, RouterLink, NgOptimizedImage],
  templateUrl: './kiosk-card.html',
  styleUrl: './kiosk-card.scss',
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        const { src, width } = config;
        return width ? src.replace(IMAGE_SUFFIX_REGEX, `-${width}$1`) : src;
      },
    },
  ],
  host: { class: 'app-kiosk-card' },
})
export class KioskCard {
  /** URL of the card image, or the placeholder asset when omitted. */
  readonly image = input('assets/card-placeholder.png');
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
