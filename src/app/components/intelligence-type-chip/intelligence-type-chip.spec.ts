import { render, screen } from '@testing-library/angular';
import { IntelligenceTypeChip } from './intelligence-type-chip';

describe('IntelligenceTypeChip', () => {
  it('renders the image and label from inputs', async () => {
    await render(IntelligenceTypeChip, {
      inputs: {
        label: 'Collective',
        image: '/assets/collective.svg',
      },
    });

    expect(screen.getByAltText('Collective')).toBeInTheDocument();
    expect(screen.getByText('Collective')).toBeInTheDocument();
  });
});
