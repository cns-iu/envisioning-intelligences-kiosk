import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntelligenceTypeChip } from './components/intelligence-type-chip/intelligence-type-chip';
import { KioskCard } from './components/kiosk-card/kiosk-card';
import { KioskCardContainer } from './components/kiosk-card/kiosk-card-container/kiosk-card-container';

@Component({
  selector: 'app-root',
  imports: [RouterModule, KioskCard, KioskCardContainer, IntelligenceTypeChip],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
