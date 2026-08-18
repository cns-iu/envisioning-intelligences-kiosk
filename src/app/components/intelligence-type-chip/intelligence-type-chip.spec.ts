import { render, screen } from '@testing-library/angular';
import { IntelligenceTypeChip } from './intelligence-type-chip';

describe('IntelligenceTypeChip', () => {
  it('renders the image and label from inputs', async () => {
    await render(`<app-intelligence-type-chip [label]="label" [image]="image"></app-intelligence-type-chip>`, {
      componentProperties: {
        label: 'Collective',
        image: '/assets/collective.svg',
      },
      imports: [IntelligenceTypeChip],
    });

    expect(screen.getByAltText('Collective')).toBeInTheDocument();
    expect(screen.getByText('Collective')).toBeInTheDocument();
  });
});
