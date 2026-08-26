import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';

function hasOpenAboutMethod(instance: unknown): instance is { openAbout: () => void } {
  return (
    typeof instance === 'object' &&
    instance !== null &&
    'openAbout' in instance &&
    typeof instance.openAbout === 'function'
  );
}

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly currentVisualization = input<string>('Title of Visualization');

  protected readonly activeInstance = signal<unknown>(undefined);

  protected openAbout(): void {
    const instance = this.activeInstance();
    if (hasOpenAboutMethod(instance)) {
      instance.openAbout();
    }
  }
}
