import { provideRouter } from '@angular/router';
import { fireEvent, render } from '@testing-library/angular';
import { Header } from './header';

describe('Header', () => {
  const providers = [provideRouter([])];

  it('renders the logo as an accessible link to home', async () => {
    const { getByLabelText } = await render(Header, { providers });
    const logo = getByLabelText('Home');

    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders the provided title', async () => {
    const { getByText } = await render(Header, {
      providers,
      inputs: { title: 'Envisioning Intelligences' },
    });

    expect(getByText('Envisioning Intelligences')).toBeInTheDocument();
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
