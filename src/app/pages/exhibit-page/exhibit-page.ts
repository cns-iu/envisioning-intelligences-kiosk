import { Component, input } from '@angular/core';
import { Exhibit } from '../../exhibit/exhibit.model';

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
}
