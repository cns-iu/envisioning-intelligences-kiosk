import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { Exhibit, IntelligenceType } from '../../models/exhibit';
import { IntelligenceTypeChip } from '../intelligence-type-chip/intelligence-type-chip';
import { Logo } from '../logo/logo';

/** Intelligence types enum */
export enum Intelligence {
  'artificial-machine' = 'Artificial/Machine',
  animal = 'Animal',
  fungal = 'Fungal',
  plant = 'Plant',
  human = 'Human',
  extraterrestrial = 'Extraterrestrial',
}

/**
 * Component for displaying a dialog with information about the exhibit or an exhibit piece.
 */
@Component({
  selector: 'app-about-modal',
  imports: [MarkdownComponent, MatIconModule, MatButtonModule, MatDialogModule, IntelligenceTypeChip, Logo],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-about-modal--root',
  },
})
export class AboutModal {
  /** Reference to the hosting material dialog. */
  private readonly dialogRef = inject(MatDialogRef);

  /** Data passed to the dialog when it is opened. */
  readonly data = inject<Exhibit>(MAT_DIALOG_DATA);

  /** Adds a custom panel class for about modal-specific dialog styling. */
  constructor() {
    this.dialogRef.addPanelClass('app-about-modal--panel');
  }

  /**
   * Gets the label for a given intelligence type.
   */
  getTypeLabel(type: IntelligenceType): string {
    return Intelligence[type] ?? type;
  }
}
