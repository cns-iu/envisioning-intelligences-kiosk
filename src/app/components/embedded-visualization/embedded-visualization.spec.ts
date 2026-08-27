import { render, screen } from '@testing-library/angular';
import { EmbeddedVisualization } from './embedded-visualization';

describe('EmbeddedVisualization', () => {
  it('renders an iframe for the visualization URL', async () => {
    await render(EmbeddedVisualization, {
      inputs: { visualizationUrl: 'https://example.com/visualization' },
    });

    const iframe = screen.getByTitle('Embedded Page');

    expect(iframe).toHaveClass('embedded-visualization');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '100%');
    expect(iframe).toHaveAttribute('src', 'https://example.com/visualization');
  });
});
