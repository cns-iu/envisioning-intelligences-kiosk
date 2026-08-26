import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmbeddedVisualization } from '../../components/embedded-visualization/embedded-visualization';
import { EmbeddedYoutube } from '../../components/embedded-youtube/embedded-youtube';
import { Exhibit } from '../../models/exhibit';

@Component({
  selector: 'app-exhibit-page',
  imports: [EmbeddedVisualization, EmbeddedYoutube],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
})
export default class ExhibitPage {
  readonly route = inject(ActivatedRoute);
  readonly title = inject(Title);

  readonly exhibits = input<Exhibit[]>();
  readonly exhibitId = computed(() => this.route.snapshot.paramMap.get('id'));
  readonly exhibit = computed(() => this.exhibits()?.find((ex) => ex.id === this.exhibitId()));

  constructor() {
    effect(() => {
      this.title.setTitle(this.exhibit()?.title ?? 'Envisioning Intelligences');
    });
  }
}
