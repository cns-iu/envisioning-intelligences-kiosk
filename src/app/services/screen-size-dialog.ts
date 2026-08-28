import { BreakpointState } from '@angular/cdk/layout';
import { Service, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScreenSizeModal } from '../components/screen-size-modal/screen-size-modal';

/** Screen size dialog close reason. */
type ScreenSizeDialogCloseReason = 'dismissed' | 'screen-large';

/** Screen size dialog dismissed key. */
const SCREEN_SIZE_DIALOG_DISMISSED_KEY = 'screen-size-dialog-dismissed';

@Service()
export class ScreenSizeDialog {
  /** Material dialog service used to create the modal overlay. */
  readonly dialog = inject(MatDialog);

  /** Reference to the screen size dialog */
  screenSizeDialogRef?: MatDialogRef<ScreenSizeModal, ScreenSizeDialogCloseReason>;

  /**
   * Handles the screen size dialog based on the current screen size.
   * If dialog was dismissed previously, it will not be shown.
   * If the screen size is large, it will close the dialog if it is open.
   * If the screen size is small, it will open the dialog if it is not already open.
   * If the dialog is closed by the user (not by screen resize), it will not be shown again.
   * @param breakpointState - The current breakpoint state from the BreakpointObserver.
   */
  handleScreenSizeDialog(breakpointState: BreakpointState): void {
    const wasDismissed = localStorage.getItem(SCREEN_SIZE_DIALOG_DISMISSED_KEY) === 'true';
    if (wasDismissed) {
      return;
    }

    if (breakpointState.matches) {
      this.screenSizeDialogRef?.close('screen-large');
    } else {
      this.screenSizeDialogRef = this.dialog.open(ScreenSizeModal, {
        panelClass: 'app-screen-size-modal--panel',
      });
    }

    this.screenSizeDialogRef?.afterClosed().subscribe((reason) => {
      if (reason !== 'screen-large') {
        localStorage.setItem(SCREEN_SIZE_DIALOG_DISMISSED_KEY, 'true');
      }
    });
  }
}
