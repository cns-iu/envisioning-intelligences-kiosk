import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ScreenSizeModal } from '../components/screen-size-modal/screen-size-modal';
import { ScreenSizeDialog } from './screen-size-dialog';

describe('ScreenSizeDialog', () => {
  const dismissedKey = 'screen-size-dialog-dismissed';

  function setup() {
    localStorage.removeItem(dismissedKey);
    const screenSize = new Subject<BreakpointState>();
    const closeReason = new Subject<'dismissed' | 'screen-large' | undefined>();
    const close = vi.fn();

    const dialogRef = {
      close,
      afterClosed: vi.fn(() => closeReason.asObservable()),
    } as unknown as MatDialogRef<ScreenSizeModal, 'dismissed' | 'screen-large'>;

    const open = vi.fn(() => dialogRef);
    const observe = vi.fn(() => screenSize.asObservable());

    TestBed.configureTestingModule({
      providers: [
        ScreenSizeDialog,
        { provide: BreakpointObserver, useValue: { observe } },
        { provide: MatDialog, useValue: { open } },
      ],
    });

    const service = TestBed.inject(ScreenSizeDialog);

    return { close, closeReason, observe, open, screenSize, service };
  }

  afterEach(() => {
    localStorage.removeItem(dismissedKey);
  });

  it('opens the warning dialog on screens smaller than XLarge', () => {
    const { observe, open, screenSize, service } = setup();

    TestBed.runInInjectionContext(() => service.startMonitor());
    screenSize.next({ matches: false, breakpoints: {} });

    expect(observe).toHaveBeenCalledWith(Breakpoints.XLarge);
    expect(open).toHaveBeenCalledOnce();
    expect(open).toHaveBeenCalledWith(ScreenSizeModal);
  });

  it('does not open the warning when it was dismissed previously', () => {
    const { open, service } = setup();
    localStorage.setItem(dismissedKey, 'true');

    service.open();

    expect(open).not.toHaveBeenCalled();
  });

  it('remembers a user dismissal and does not open the warning again', () => {
    const { closeReason, open, service } = setup();

    service.open();

    closeReason.next('dismissed');
    service.open();

    expect(localStorage.getItem(dismissedKey)).toBe('true');
    expect(open).toHaveBeenCalledOnce();
  });

  it('treats closing with the backdrop or Escape key as a user dismissal', () => {
    const { closeReason, service } = setup();

    service.open();

    closeReason.next(undefined);

    expect(localStorage.getItem(dismissedKey)).toBe('true');
  });

  it('closes the warning without persisting a dismissal when the screen becomes XLarge', () => {
    const { close, closeReason, screenSize, service } = setup();

    TestBed.runInInjectionContext(() => service.startMonitor());
    screenSize.next({ matches: false, breakpoints: {} });
    screenSize.next({ matches: true, breakpoints: {} });

    closeReason.next('screen-large');

    expect(close).toHaveBeenCalledWith('screen-large');
    expect(localStorage.getItem(dismissedKey)).toBeNull();
  });
});
