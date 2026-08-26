import { Component, computed, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { ExhibitStore } from './services/exhibit-store';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly titleService = inject(Title);
  readonly exhibitStore = inject(ExhibitStore);
  readonly currentTitle = computed(() => this.exhibitStore.currentExhibit()?.title ?? 'Envisioning Intelligences');

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.currentTitle());
    });
  }
}
