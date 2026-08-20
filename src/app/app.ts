import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KioskCard } from './components/kiosk-card/kiosk-card';
import { KioskCardContainer } from './components/kiosk-card/kiosk-card-container/kiosk-card-container';

@Component({
  selector: 'app-root',
  imports: [RouterModule, KioskCard, KioskCardContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
