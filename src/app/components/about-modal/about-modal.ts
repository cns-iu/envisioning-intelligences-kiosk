import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { InlineSVGModule } from 'ng-inline-svg-2';

export interface AboutModalData {
  title: string;
  year: number;
  types: string[];
  affiliations: string;
  description: string;
  references: string;
  main?: boolean;
}

@Component({
  selector: 'app-about-modal',
  imports: [MarkdownComponent, MatIconModule, MatButtonModule, MatDialogModule, InlineSVGModule],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-about-modal',
  },
})
export class AboutModal {
  /**
   * Reference to the hosting material dialog.
   */
  private readonly dialogRef = inject(MatDialogRef);

  /**
   * Data passed to the dialog when it is opened.
   */
  private readonly data = inject<AboutModalData>(MAT_DIALOG_DATA);

  readonly title = this.data.title;
  readonly year = this.data.year;
  readonly types = this.data.types;
  readonly affiliations = this.data.affiliations;
  readonly description = this.data.description;
  readonly references = this.data.references;
  readonly main = this.data.main ?? false;

  /**
   * Adds a custom panel class for about modal-specific dialog styling.
   */
  constructor() {
    this.dialogRef.addPanelClass('app-about-modal--panel');
  }
}
