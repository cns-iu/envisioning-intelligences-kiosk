import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScreenSizeModal } from '../components/screen-size-modal/screen-size-modal';

/** Screen size dialog close reason. */
type ScreenSizeDialogCloseReason = 'dismissed' | 'screen-large';

/** Screen size dialog dismissed key. */
const SCREEN_SIZE_DIALOG_DISMISSED_KEY = 'screen-size-dialog-dismissed';

/**
 * Service to handle the screen size dialog.
 */
@Service()
export class ScreenSizeDialog {
  /** Material dialog service used to create the modal overlay. */
  readonly dialog = inject(MatDialog);
  /** Service used to observe breakpoint changes. */
  readonly breakpointObserver = inject(BreakpointObserver);

  /** Reference to the screen size dialog */
  screenSizeDialogRef?: MatDialogRef<ScreenSizeModal, ScreenSizeDialogCloseReason>;

  /** Observe breakpoint changes and opens/closes the screen size dialog as needed. */
  startMonitor(): void {
    this.breakpointObserver
      .observe(Breakpoints.XLarge)
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        if (state.matches) {
          this.close();
        } else {
          this.open();
        }
      });
  }

  /**
   * Opens the screen size dialog if it has not been previously dismissed.
   * If the dialog is then closed, remember that it was dismissed so it does not open again.
   */
  open(): void {
    const wasDismissed = localStorage.getItem(SCREEN_SIZE_DIALOG_DISMISSED_KEY) === 'true';
    if (wasDismissed) {
      return;
    }
    this.screenSizeDialogRef = this.dialog.open(ScreenSizeModal);

    this.screenSizeDialogRef?.afterClosed().subscribe((reason) => {
      if (reason !== 'screen-large') {
        localStorage.setItem(SCREEN_SIZE_DIALOG_DISMISSED_KEY, 'true');
      }
    });
  }

  /** Closes the screen size dialog (only used when screen has been resized to a large size). */
  close(): void {
    this.screenSizeDialogRef?.close('screen-large');
  }
}
