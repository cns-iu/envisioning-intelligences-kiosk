import { render, screen } from '@testing-library/angular';
import { KioskCard } from './kiosk-card';

describe('KioskCard', () => {
  it('renders the card image, title, and type label from the inputs', async () => {
    const { container } = await render(KioskCard, {
      componentInputs: {
        image: 'assets/demo-image.png',
        title: 'Deep Time Stories',
        type: 'visualization',
        link: '/works/deep-time',
      },
    });

    expect(container.querySelector('img')).toHaveAttribute('src', 'assets/demo-image.png');
    expect(screen.getByText('Deep Time Stories')).toBeInTheDocument();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
    expect(container.querySelector('a')).toHaveAttribute('href', '/works/deep-time');
  });

  it('uses the default imagewhen inputs are not provided', async () => {
    const { container } = await render(KioskCard, {
      componentInputs: {
        title: 'Default Work',
        type: 'visualization',
        link: '/works/default',
      },
    });

    expect(container.querySelector('img')).toHaveAttribute('src', 'assets/card-placeholder.png');
    expect(container.querySelector('a')).toHaveAttribute('href', '/works/default');
  });
});
