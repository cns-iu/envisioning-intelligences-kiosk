import { Component, input } from '@angular/core';

@Component({
  selector: 'app-intelligence-type-chip',
  imports: [],
  templateUrl: './intelligence-type-chip.html',
  styleUrl: './intelligence-type-chip.scss',
})
export class IntelligenceTypeChip {
  readonly image = input.required<string>();
  readonly label = input.required<string>();
}
