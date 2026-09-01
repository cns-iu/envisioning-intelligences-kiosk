import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  readonly breakpointObserver = inject(BreakpointObserver);

  /** Reference to the screen size dialog */
  screenSizeDialogRef?: MatDialogRef<ScreenSizeModal, ScreenSizeDialogCloseReason>;

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

  close(): void {
    this.screenSizeDialogRef?.close('screen-large');
  }
}
