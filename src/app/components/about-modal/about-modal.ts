import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { Exhibit, IntelligenceTypeLabels } from '../../exhibit/exhibit.model';
import { IntelligenceTypeChip } from '../intelligence-type-chip/intelligence-type-chip';
import { Logo } from '../logo/logo';

/**
 * Component for displaying a dialog with information about the exhibit or an exhibit piece.
 */
@Component({
  selector: 'app-about-modal',
  imports: [MarkdownComponent, MatIconModule, MatButtonModule, MatDialogModule, IntelligenceTypeChip, Logo],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-about-modal' },
})
export class AboutModal {
  /** Exhibit whose descriptive content is displayed by the dialog. */
  readonly exhibit = input.required<Exhibit>();

  /** Whether to show the exhibit title instead of the application logo. */
  readonly showTitle = input(true);

  /** Render-ready labels and image paths for supported intelligence types. */
  protected readonly chips = computed(() => {
    return this.exhibit()
      .intelligenceTypes.filter((id) => id in IntelligenceTypeLabels)
      .map((id) => ({
        id: id,
        label: IntelligenceTypeLabels[id],
        image: `assets/${id}.png`,
      }));
  });
}
