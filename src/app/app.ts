import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KioskCard } from './components/kiosk-card/kiosk-card';

@Component({
  selector: 'app-root',
  imports: [RouterModule, KioskCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
