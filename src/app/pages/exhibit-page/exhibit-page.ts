import { Component, input } from '@angular/core';
import { EmbeddedVisualization } from '../../components/embedded-visualization/embedded-visualization';
import { Exhibit } from '../../models/exhibit';

@Component({
  selector: 'app-exhibit-page',
  imports: [EmbeddedVisualization],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
})
export default class ExhibitPage {
  readonly exhibit = input<Exhibit>();
}
