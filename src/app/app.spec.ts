import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('renders the current visualization title', async () => {
    await render(App, {
      providers: [provideRouter([])],
      inputs: { currentVisualization: 'Envisioning Intelligences' },
    });

    expect(screen.getByText('Envisioning Intelligences')).toBeInTheDocument();
  });
});
