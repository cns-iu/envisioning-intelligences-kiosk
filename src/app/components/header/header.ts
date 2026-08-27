import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Logo } from '../logo/logo';
import { InteractiveElementManager } from '../../shared/interactive-element-manager';

/**
 *  Header component for the application.
 */
@Component({
  selector: 'app-header',
  imports: [Logo, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /** Title of header */
  readonly title = input<string>();

  /** Emits when the about button is clicked */
  readonly aboutClick = output();

  /** Reference to the logo element */
  private readonly logoEl = viewChild.required<ElementRef<HTMLElement>>('logo');

  /** Initializes the header component. */
  constructor() {
    new InteractiveElementManager(() => this.logoEl().nativeElement, { centeredRipples: false });
  }
}
