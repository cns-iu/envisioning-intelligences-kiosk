import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Logo } from '../logo/logo';

/**
 *  Header component for the application.
 */
@Component({
  selector: 'app-header',
  imports: [RouterModule, MatButtonModule, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /** Title of header */
  readonly title = input<string>();

  /** Emits when the about button is clicked */
  readonly aboutClick = output();
}
