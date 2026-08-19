import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntelligenceTypeChip } from './components/intelligence-type-chip/intelligence-type-chip';

@Component({
  selector: 'app-root',
  imports: [RouterModule, IntelligenceTypeChip],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
