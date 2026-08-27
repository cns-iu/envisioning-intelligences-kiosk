import { Component, inject, input } from '@angular/core';
import { Exhibit } from '../../exhibit/exhibit.model';
import { AboutDialog } from '../../services/about-dialog';
import { AppEvents } from '../../services/app-events';

/** Renders the detail view for the exhibit selected by the current route. */
@Component({
  selector: 'app-exhibit-page',
  imports: [],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
})
export default class ExhibitPage {
  /** Exhibit resolved from the current route. */
  readonly exhibit = input.required<Exhibit>();

  /** Dialog controller used to display details for the active exhibit. */
  readonly #dialog = inject(AboutDialog);

  /** Subscribes to application-level About requests for this routed page. */
  constructor() {
    inject(AppEvents).on('open-about', () => this.#openDialog());
  }

  /** Opens the About dialog for the exhibit resolved by the current route. */
  #openDialog(): void {
    this.#dialog.open(this.exhibit());
  }
}
