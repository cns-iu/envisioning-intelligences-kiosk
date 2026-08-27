import { render, screen } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { Exhibit, IntelligenceType } from '../../exhibit/exhibit.model';
import { AboutModal } from './about-modal';

describe('AboutModal', () => {
  function createExhibit(overrides: Partial<Exhibit> = {}): Exhibit {
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

  async function renderModal(exhibit: Exhibit = createExhibit(), showTitle = true) {
    return render(AboutModal, {
      inputs: { exhibit, showTitle },
      providers: [MarkdownService],
    });
  }

  it('renders the title and year by default', async () => {
    await renderModal(
      createExhibit({
        title: 'Living Systems',
        year: 2026,
      }),
    );

    expect(screen.getByText('Living Systems')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders the application logo when the title is disabled', async () => {
    const { fixture } = await renderModal(createExhibit(), false);

    expect(fixture.nativeElement.querySelector('app-logo')).toBeInTheDocument();
    expect(screen.queryByText('About')).not.toBeInTheDocument();
  });

  it('renders labels and images for supported intelligence types', async () => {
    await renderModal(
      createExhibit({
        intelligenceTypes: ['animal', 'artificial-machine'],
      }),
    );

    expect(screen.getByRole('img', { name: 'Animal' })).toHaveAttribute('src', 'assets/animal.png');
    expect(screen.getByRole('img', { name: 'Artificial/Machine' })).toHaveAttribute(
      'src',
      'assets/artificial-machine.png',
    );
  });

  it('ignores unsupported intelligence types defensively', async () => {
    await renderModal(
      createExhibit({
        intelligenceTypes: ['animal', 'unknown'] as IntelligenceType[],
      }),
    );

    expect(screen.getByText('Animal')).toBeInTheDocument();
    expect(screen.queryByText('unknown')).not.toBeInTheDocument();
  });

  it('renders the description markdown content', async () => {
    await renderModal(
      createExhibit({
        description: 'A living description with **markdown**.',
      }),
    );

    expect(screen.getByText(/A living description with/i)).toBeInTheDocument();
    expect(screen.getByText('markdown')).toHaveRole('strong');
  });

  it('provides an accessible close button', async () => {
    await renderModal();

    expect(screen.getByRole('button', { name: 'Close about' })).toBeInTheDocument();
  });
});
