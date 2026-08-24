import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { AboutModal } from './about-modal';
import { About } from '../../models/about';
import { IntelligenceType } from '../../models/exhibit';

describe('AboutModal', () => {
  const dialogRef = {
    addPanelClass: vi.fn(),
  };

  function createAboutData(overrides: Partial<About> = {}): About {
    return {
      id: 'about-1',
      intelligenceTypes: [],
      description: 'Base description',
      ...overrides,
    };
  }

  async function renderModal(data: About = createAboutData()) {
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

    expect(dialogRef.addPanelClass).toHaveBeenCalledWith('about-modal--panel');
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

  it('renders the logo when the title is not provided', async () => {
    const { container } = await renderModal();

    expect(container.querySelector('.about-modal--logo-container')).toBeInTheDocument();
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
