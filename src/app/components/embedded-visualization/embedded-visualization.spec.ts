import { render } from '@testing-library/angular';
import { EmbeddedVisualization } from './embedded-visualization';

describe('EmbeddedVisualization', () => {
  it('renders a sandboxed iframe for the visualization URL', async () => {
    const visualizationUrl = 'https://example.com/visualization';
    const { container, fixture } = await render(EmbeddedVisualization, {
      inputs: { url: visualizationUrl },
    });
    const iframe = container.querySelector('iframe');

    expect(fixture.nativeElement).toHaveClass('app-embedded-visualization');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveClass('app-embedded-visualization--iframe');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '100%');
    expect(iframe).toHaveAttribute('sandbox', 'allow-forms allow-same-origin allow-scripts');
    expect(iframe).toHaveAttribute('src', visualizationUrl);
  });
});
