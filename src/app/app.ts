import { Component, computed, Signal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Exhibit } from './models/exhibit';
import ExhibitPage from './pages/exhibit-page/exhibit-page';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** Exhibit signal exposed by the currently activated routed component, if any. */
  private readonly activatedExhibit = signal<Signal<Exhibit | undefined> | undefined>(undefined);

  /** Exhibit backing the currently routed page, kept in sync with the page's own signal. */
  readonly currentExhibit = computed(() => this.activatedExhibit()?.());

  /** Reads the exhibit signal off the activated routed component, if it exposes one. */
  onActivate(component: unknown): void {
    this.activatedExhibit.set(component instanceof ExhibitPage ? component.exhibit : undefined);
  }

  onDeactivate(): void {
    this.activatedExhibit.set(undefined);
  }
}
