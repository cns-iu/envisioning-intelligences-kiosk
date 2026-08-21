import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AboutService } from './services/about.service';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly about = inject(AboutService);
}
