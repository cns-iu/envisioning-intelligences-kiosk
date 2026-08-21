import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MarkdownComponent } from 'ngx-markdown';
import { IntelligenceTypeChip } from '../intelligence-type-chip/intelligence-type-chip';

/** Intelligence types enum */
export enum IntelligenceType {
  artificial = 'Artificial/Machine',
  animal = 'Animal',
  fungal = 'Fungal',
  plant = 'Plant',
  human = 'Human',
  extraterrestrial = 'Extraterrestrial',
}

/** Data for the About Modal */
export interface AboutModalData {
  /** Intelligence types associated with the exhibit or piece */
  types: string[];
  /** Piece title */
  title?: string;
  /** Year piece was created */
  year?: number;
  /** Sections containing information */
  sections?: AboutModalSection[];
}

/** Section for About Modal info */
export interface AboutModalSection {
  /** Section title */
  title: string;
  /** Section content */
  content: string;
}

/**
 * Component for displaying a dialog with information about the exhibit or an exhibit piece.
 */
@Component({
  selector: 'app-about-modal',
  imports: [MarkdownComponent, MatIconModule, MatButtonModule, MatDialogModule, InlineSVGModule, IntelligenceTypeChip],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-about-modal',
  },
})
export class AboutModal {
  /** Reference to the hosting material dialog. */
  private readonly dialogRef = inject(MatDialogRef);

  /** Data passed to the dialog when it is opened. */
  readonly data = inject<AboutModalData>(MAT_DIALOG_DATA);

  /** Adds a custom panel class for about modal-specific dialog styling. */
  constructor() {
    this.dialogRef.addPanelClass('app-about-modal--panel');
  }

  /**
   * Gets the label for a given intelligence type.
   */
  getTypeLabel(type: string): string {
    return IntelligenceType[type as keyof typeof IntelligenceType] ?? type;
  }
}
