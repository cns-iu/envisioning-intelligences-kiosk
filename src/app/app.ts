import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AboutService } from './services/about.service';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly about = inject(AboutService);
  readonly currentVisualization = input<string>('Title of Visualization');
}
