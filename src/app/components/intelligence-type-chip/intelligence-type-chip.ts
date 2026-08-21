import { Component, input } from '@angular/core';

/**
 * These chips categorize intelligence types for specific pieces
 */
@Component({
  selector: 'app-intelligence-type-chip',
  imports: [],
  templateUrl: './intelligence-type-chip.html',
  styleUrl: './intelligence-type-chip.scss',
})
export class IntelligenceTypeChip {
  /** Path to the image for the chip */
  readonly image = input.required<string>();
  /** The label for the chip */
  readonly label = input.required<string>();
}
