import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { Exhibit } from '../../exhibit/exhibit.model';
import { AboutDialog } from '../../services/about-dialog';
import { AppEvents } from '../../services/app-events';
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

  const open = vi.fn();

  async function setup() {
    return render(ExhibitPage, {
      inputs: { exhibit: EXHIBIT },
      providers: [AppEvents, { provide: AboutDialog, useValue: { open } }],
    });
  }

  beforeEach(() => {
    open.mockReset();
  });

  it('accepts the exhibit resolved for the route', async () => {
    const { fixture } = await setup();

    expect(fixture.componentInstance.exhibit()).toEqual(EXHIBIT);
  });

  it('opens an About dialog for the active exhibit', async () => {
    await setup();

    TestBed.inject(AppEvents).dispatch('open-about');

    expect(open).toHaveBeenCalledWith(EXHIBIT);
  });
});
