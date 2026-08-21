import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { AboutModal, IntelligenceType } from './about-modal';

describe('AboutModal', () => {
  const dialogRef = {
    addPanelClass: vi.fn(),
  };

  async function renderModal(data: {
    title?: string;
    year?: number;
    types: string[];
    sections?: { title: string; content: string }[];
  }) {
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
    await renderModal({ types: [] });

    expect(dialogRef.addPanelClass).toHaveBeenCalledWith('app-about-modal--panel');
  });

  it('renders the title and year', async () => {
    await renderModal({
      title: 'Living Systems',
      year: 2026,
      types: [],
    });

    expect(screen.getByText('Living Systems')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders intelligence type labels from enum keys and preserves unknown values', async () => {
    await renderModal({
      types: [IntelligenceType.animal, 'artificial', 'unknown'],
    });

    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.getByText('Artificial/Machine')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  it('renders every content section', async () => {
    await renderModal({
      types: [],
      sections: [
        { title: 'Description', content: 'A living description.' },
        { title: 'References', content: 'A useful reference.' },
      ],
    });

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('A living description.')).toBeInTheDocument();
    expect(screen.getByText('References')).toBeInTheDocument();
    expect(screen.getByText('A useful reference.')).toBeInTheDocument();
  });
});
