import { Component, inject, model } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmbeddedVisualization } from '../../components/embedded-visualization/embedded-visualization';
import { Exhibit } from '../../models/exhibit';
import { ExhibitStore } from '../../services/exhibit-store';

@Component({
  selector: 'app-exhibit-page',
  imports: [EmbeddedVisualization],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
})
export default class ExhibitPage {
  readonly route = inject(ActivatedRoute);
  readonly exhibitStore = inject(ExhibitStore);

  readonly exhibit = model<Exhibit>();

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.exhibit.set(this.exhibitStore.exhibits.value().find((ex) => ex.id === id));
  }
}
