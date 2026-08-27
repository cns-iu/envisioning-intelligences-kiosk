import { render } from '@testing-library/angular';
import { Exhibit } from '../../exhibit/exhibit.model';
import ExhibitPage from './exhibit-page';

describe('ExhibitPage', () => {
  const EXHIBIT: Exhibit = {
    id: 'collective-intelligence',
    title: 'Collective Intelligence',
    description: 'A study of distributed problem-solving.',
    year: 2026,
    cardImageUrl: 'assets/images/collective-intelligence.webp',
    intelligenceTypes: ['human', 'artificial-machine'],
  };

  it('accepts the exhibit resolved for the route', async () => {
    const { fixture } = await render(ExhibitPage, { inputs: { exhibit: EXHIBIT } });

    expect(fixture.componentInstance.exhibit()).toEqual(EXHIBIT);
  });
});
