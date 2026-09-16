import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, waitFor } from '@testing-library/angular';
import { Exhibit } from '../../exhibit/exhibit.model';
import AboutDialog from '../../services/about-dialog';
import { AppEvents } from '../../services/app-events';
import { IS_KIOSK_MODE } from '../../shared/kiosk-mode';
import ExhibitPage from './exhibit-page';

describe('ExhibitPage', () => {
  const EXHIBIT: Exhibit = {
    id: 'collective-intelligence',
    title: 'Collective Intelligence',
    description: 'A study of distributed problem-solving.',
    year: 2026,
    thumbnailUrl: 'assets/images/collective-intelligence.webp',
    intelligenceTypes: ['human', 'artificial-machine'],
  };

  const open = vi.fn();

  async function setup(exhibit = EXHIBIT, isKioskMode = false) {
    return render(ExhibitPage, {
      inputs: { exhibit },
      providers: [
        AppEvents,
        { provide: AboutDialog, useValue: { open } },
        { provide: IS_KIOSK_MODE, useValue: signal(isKioskMode) },
      ],
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

    await waitFor(() => expect(open).toHaveBeenCalledWith(EXHIBIT));
  });

  it('limits embedded video controls in kiosk mode', async () => {
    const videoExhibit: Exhibit = {
      ...EXHIBIT,
      videoUrl: 'assets/videos/collective-intelligence.mp4',
    };
    const { container } = await setup(videoExhibit, true);

    expect(container.querySelector('video')).toHaveAttribute('controlslist', 'nodownload nofullscreen');
  });
});
