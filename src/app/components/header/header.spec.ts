import { provideRouter } from '@angular/router';
import { fireEvent, render } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { Header } from './header';

describe('Header', () => {
  const providers = [provideRouter([]), MarkdownService];

  it('renders the logo as an accessible link to home', async () => {
    const { getByLabelText } = await render(Header, { providers });
    const logo = getByLabelText('Home');

    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders the provided title', async () => {
    const { findByText } = await render(Header, {
      providers,
      inputs: { title: 'Envisioning Intelligences' },
    });

    expect(await findByText('Envisioning Intelligences')).toBeInTheDocument();
  });

  it('renders markdown in the provided title', async () => {
    const { findByText } = await render(Header, {
      providers,
      inputs: { title: 'The **Living** World' },
    });

    expect(await findByText('Living')).toHaveRole('strong');
  });

  it('emits when the about button is clicked', async () => {
    const aboutClick = vi.fn();
    const { getByRole } = await render(Header, {
      providers,
      on: { aboutClick },
    });

    fireEvent.click(getByRole('button', { name: 'About' }));

    expect(aboutClick).toHaveBeenCalledOnce();
  });
});
