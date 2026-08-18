import { Component } from '@angular/core';
import { IntelligenceTypeChip } from '../intelligence-type-chip/intelligence-type-chip';

@Component({
  selector: 'app-main-page',
  imports: [IntelligenceTypeChip],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
