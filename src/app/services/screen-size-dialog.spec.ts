import { BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ScreenSizeModal } from '../components/screen-size-modal/screen-size-modal';
import { ScreenSizeDialog } from './screen-size-dialog';

describe('ScreenSizeDialog', () => {
  const dismissedKey = 'screen-size-dialog-dismissed';
  const smallScreen: BreakpointState = { matches: false, breakpoints: {} };
  const largeScreen: BreakpointState = { matches: true, breakpoints: {} };

  let service: ScreenSizeDialog;
  let closeReason: Subject<'dismissed' | 'screen-large' | undefined>;
  let close: ReturnType<typeof vi.fn>;
  let open: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.removeItem(dismissedKey);
    closeReason = new Subject();
    close = vi.fn();

    const dialogRef = {
      close,
      afterClosed: vi.fn(() => closeReason.asObservable()),
    } as unknown as MatDialogRef<ScreenSizeModal, 'dismissed' | 'screen-large'>;

    open = vi.fn(() => dialogRef);

    TestBed.configureTestingModule({
      providers: [ScreenSizeDialog, { provide: MatDialog, useValue: { open } }],
    });

    service = TestBed.inject(ScreenSizeDialog);
  });

  afterEach(() => {
    localStorage.removeItem(dismissedKey);
  });

  it('opens the warning dialog on screens smaller than XLarge', () => {
    service.handleScreenSizeDialog(smallScreen);

    expect(open).toHaveBeenCalledOnce();
    expect(open).toHaveBeenCalledWith(ScreenSizeModal, {
      panelClass: 'app-screen-size-modal--panel',
    });
  });

  it('does not open the warning when it was dismissed previously', () => {
    localStorage.setItem(dismissedKey, 'true');

    service.handleScreenSizeDialog(smallScreen);

    expect(open).not.toHaveBeenCalled();
  });

  it('remembers a user dismissal and does not open the warning again', () => {
    service.handleScreenSizeDialog(smallScreen);

    closeReason.next('dismissed');
    service.handleScreenSizeDialog(smallScreen);

    expect(localStorage.getItem(dismissedKey)).toBe('true');
    expect(open).toHaveBeenCalledOnce();
  });

  it('treats closing with the backdrop or Escape key as a user dismissal', () => {
    service.handleScreenSizeDialog(smallScreen);

    closeReason.next(undefined);

    expect(localStorage.getItem(dismissedKey)).toBe('true');
  });

  it('closes the warning without persisting a dismissal when the screen becomes XLarge', () => {
    service.handleScreenSizeDialog(smallScreen);

    service.handleScreenSizeDialog(largeScreen);
    closeReason.next('screen-large');

    expect(close).toHaveBeenCalledWith('screen-large');
    expect(localStorage.getItem(dismissedKey)).toBeNull();
  });
});
