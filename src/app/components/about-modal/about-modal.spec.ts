import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { AboutModal } from './about-modal';
import { Exhibit, IntelligenceType } from '../../models/exhibit';

describe('AboutModal', () => {
  const dialogRef = {
    addPanelClass: vi.fn(),
  };

  function createAboutData(overrides: Partial<Exhibit> = {}): Exhibit {
    return {
      id: 'about-1',
      title: 'About',
      year: 2026,
      cardImageUrl: '',
      intelligenceTypes: [],
      description: 'Base description',
      ...overrides,
    };
  }

  async function renderModal(data: Exhibit = createAboutData()) {
    return render(AboutModal, {
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRef },
        MarkdownService,
      ],
    });
  }

  beforeEach(() => {
    dialogRef.addPanelClass.mockClear();
  });

  it('creates the modal and adds its panel class', async () => {
    await renderModal();

    expect(dialogRef.addPanelClass).toHaveBeenCalledWith('app-about-modal--panel');
  });

  it('renders the title and year', async () => {
    await renderModal(
      createAboutData({
        title: 'Living Systems',
        year: 2026,
      }),
    );

    expect(screen.getByText('Living Systems')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders the logo when not on an exhibit page', async () => {
    const { fixture } = await renderModal(
      createAboutData({
        id: 'envisioning-intelligences',
      }),
    );

    expect(fixture.nativeElement.querySelector('app-logo')).toBeInTheDocument();
  });

  it('maps known intelligence types and preserves unknown values in getTypeLabel', async () => {
    const { fixture } = await renderModal(
      createAboutData({
        intelligenceTypes: ['animal'] as IntelligenceType[],
      }),
    );

    expect(fixture.componentInstance.getTypeLabel('animal' as IntelligenceType)).toBe('Animal');
    expect(fixture.componentInstance.getTypeLabel('unknown' as IntelligenceType)).toBe('unknown');
  });

  it('renders intelligence type labels', async () => {
    await renderModal(
      createAboutData({
        intelligenceTypes: ['animal', 'artificial-machine'],
      }),
    );

    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.getByText('Artificial/Machine')).toBeInTheDocument();
  });

  it('renders the description markdown content', async () => {
    await renderModal(
      createAboutData({
        description: 'A living description with **markdown**.',
      }),
    );

    expect(screen.getByText(/A living description with/i)).toBeInTheDocument();
  });
});
