import { Service, inject, inputBinding } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AboutModal } from '../components/about-modal/about-modal';
import { Exhibit } from '../exhibit/exhibit.model';

/** Opens consistently configured About dialogs for exhibit content. */
@Service()
export class AboutDialog {
  /** Material dialog service used to create the modal overlay. */
  readonly #dialog = inject(MatDialog);

  /**
   * Opens an About dialog for an exhibit.
   *
   * @param exhibit Exhibit content rendered by the modal.
   * @param showTitle Whether the exhibit title replaces the application logo.
   * @returns Reference to the newly opened dialog.
   */
  open(exhibit: Exhibit, showTitle = true): MatDialogRef<AboutModal> {
    return this.#dialog.open(AboutModal, {
      ariaLabel: `About the ${exhibit.title}`,
      bindings: [inputBinding('exhibit', () => exhibit), inputBinding('showTitle', () => showTitle)],
      closeOnNavigation: true,
      hasBackdrop: true,
      maxWidth: 'calc(100vw - 32px)',
      panelClass: 'app-about-modal--panel',
    });
  }
}
