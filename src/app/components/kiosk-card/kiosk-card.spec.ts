import { render, screen } from '@testing-library/angular';
import { KioskCard } from './kiosk-card';

describe('KioskCard', () => {
  it('renders the card image, title, and type label from the inputs', async () => {
    await render(KioskCard, {
      inputs: {
        image: 'assets/demo-image.png',
        title: 'Deep Time Stories',
        type: 'visualization',
        link: '/works/deep-time',
      },
    });

    expect(screen.getByAltText('')).toHaveAttribute('src', 'assets/demo-image.png');
    expect(screen.getByText('Deep Time Stories')).toBeInTheDocument();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Deep Time Stories/ })).toHaveAttribute('href', '/works/deep-time');
  });

  it('uses the default image when inputs are not provided', async () => {
    await render(KioskCard, {
      inputs: {
        title: 'Default Work',
        type: 'visualization',
        link: '/works/default',
      },
    });

    expect(screen.getByAltText('')).toHaveAttribute('src', 'assets/card-placeholder.png');
    expect(screen.getByRole('link', { name: /Default Work/ })).toHaveAttribute('href', '/works/default');
  });
});
