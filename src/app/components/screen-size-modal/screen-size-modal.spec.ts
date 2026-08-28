import { render, screen } from '@testing-library/angular';
import { ScreenSizeModal } from './screen-size-modal';

describe('ScreenSizeModal', () => {
  it('renders the screen size warning and close action', async () => {
    await render(ScreenSizeModal);

    expect(screen.getByText('Limited experience')).toBeInTheDocument();
    expect(screen.getByText(/Your screen is below 1920×1080/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close screen size dialog' })).toBeInTheDocument();
  });
});
