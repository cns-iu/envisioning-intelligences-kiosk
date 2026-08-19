import { fireEvent, render } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  const providers = [provideRouter([])];

  it('renders the logo as an accessible link to home', async () => {
    const { getByRole } = await render(Header, { providers });
    const logo = getByRole('link', { name: 'Home' });

    expect(logo).toHaveAttribute('href', '/');
  });

  it('does not render a title when no title is provided', async () => {
    const { queryByText } = await render(Header, { providers });

    expect(queryByText('Envisioning Intelligences')).not.toBeInTheDocument();
  });

  it('renders the provided title', async () => {
    const { getByText } = await render(Header, {
      providers,
      inputs: { title: 'Envisioning Intelligences' },
    });

    expect(getByText('Envisioning Intelligences')).toBeInTheDocument();
  });

  it('renders the home and about navigation buttons', async () => {
    const { getAllByRole } = await render(Header, { providers });
    const buttons = getAllByRole('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Home');
    expect(buttons[0]).toHaveAttribute('routerlink', '/');
    expect(buttons[1]).toHaveTextContent('About');
  });

  it('emits when the about button is clicked', async () => {
    const aboutClicked = vi.fn();
    const { getByRole } = await render(Header, {
      providers,
      on: { aboutClicked },
    });

    fireEvent.click(getByRole('button', { name: 'About' }));

    expect(aboutClicked).toHaveBeenCalledOnce();
  });
});
