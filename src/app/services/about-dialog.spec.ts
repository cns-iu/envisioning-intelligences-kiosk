import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { screen } from '@testing-library/dom';
import { MarkdownService } from 'ngx-markdown';
import { Exhibit } from '../exhibit/exhibit.model';
import { AboutModal } from '../components/about-modal/about-modal';
import { AboutDialog } from './about-dialog';

describe('AboutDialog', () => {
  const EXHIBIT: Exhibit = {
    id: 'living-systems',
    title: 'Living Systems',
    description: 'A living description.',
    year: 2026,
    cardImageUrl: 'assets/living-systems.png',
    intelligenceTypes: ['plant'],
  };

  const dialogRef = {} as MatDialogRef<AboutModal>;
  const open = vi.fn<(component: typeof AboutModal, config: MatDialogConfig) => MatDialogRef<AboutModal>>(
    () => dialogRef,
  );

  it('opens a consistently configured About modal', () => {
    open.mockClear();
    TestBed.configureTestingModule({
      providers: [AboutDialog, { provide: MatDialog, useValue: { open } }],
    });
    const result = TestBed.inject(AboutDialog).open(EXHIBIT, false);

    expect(result).toBe(dialogRef);
    expect(open).toHaveBeenCalledWith(
      AboutModal,
      expect.objectContaining({
        ariaLabel: 'About the Living Systems',
        closeOnNavigation: true,
        hasBackdrop: true,
        maxWidth: 'calc(100vw - 32px)',
        panelClass: 'app-about-modal--panel',
        bindings: expect.any(Array),
      }),
    );
    expect(open.mock.calls[0][1]?.bindings).toHaveLength(2);
  });

  it('binds the exhibit content and title preference into the rendered modal', async () => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [AboutDialog, MarkdownService],
    });

    const renderedDialogRef = TestBed.inject(AboutDialog).open(EXHIBIT);

    expect(await screen.findByText('Living Systems')).toBeInTheDocument();

    renderedDialogRef.close();
  });
});
