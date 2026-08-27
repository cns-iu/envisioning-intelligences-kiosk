import { FocusMonitor } from '@angular/cdk/a11y';
import { MatRippleLoader } from '@angular/material/core';
import { render, screen } from '@testing-library/angular';
import { EMPTY } from 'rxjs';
import { Exhibit } from '../../../exhibit/exhibit.model';
import { KioskCardCarouselSlide } from './kiosk-card-carousel-slide';

const EXHIBITS: Exhibit[] = [
  {
    id: 'video-work',
    title: 'A Video Work',
    description: 'A moving-image exhibit.',
    year: 2024,
    cardImageUrl: 'assets/video-work.png',
    intelligenceTypes: ['human'],
    videoId: 'video-1',
  },
  {
    id: 'visual-work',
    title: 'A Visual Work',
    description: 'An interactive exhibit.',
    year: 2025,
    cardImageUrl: 'assets/visual-work.png',
    intelligenceTypes: ['artificial-machine'],
    visualizationUrl: 'visualization-1',
  },
];

describe('KioskCardCarouselSlide', () => {
  async function setup(isFirstSlide = false) {
    return render(KioskCardCarouselSlide, {
      inputs: { exhibits: EXHIBITS, isFirstSlide },
      providers: [
        { provide: FocusMonitor, useValue: { monitor: vi.fn(() => EMPTY), stopMonitoring: vi.fn() } },
        { provide: MatRippleLoader, useValue: { configureRipple: vi.fn(), destroyRipple: vi.fn() } },
      ],
    });
  }

  it('maps exhibits to linked video and visualization cards', async () => {
    await setup();

    expect(screen.getByRole('link', { name: /A Video Work/ })).toHaveAttribute('href', '/exhibit/video-work');
    expect(screen.getByRole('link', { name: /A Visual Work/ })).toHaveAttribute('href', '/exhibit/visual-work');
    expect(screen.getByText('Video')).toBeInTheDocument();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
    expect(screen.getAllByAltText('')).toHaveLength(2);
  });

  it('prioritizes every card image on the first slide', async () => {
    await setup(true);

    for (const image of screen.getAllByAltText('')) {
      expect(image).toHaveAttribute('fetchpriority', 'high');
    }
  });

  it('leaves images on later slides unprioritized', async () => {
    await setup();

    for (const image of screen.getAllByAltText('')) {
      expect(image).not.toHaveAttribute('fetchpriority', 'high');
    }
  });
});
