import { FocusMonitor } from '@angular/cdk/a11y';
import { MatRippleLoader } from '@angular/material/core';
import { render, screen, waitFor } from '@testing-library/angular';
import { EMPTY } from 'rxjs';
import { register, SwiperContainer } from 'swiper/element';
import { Exhibit } from '../../exhibit/exhibit.model';
import { KioskCardCarousel } from './kiosk-card-carousel';

function createExhibit(index: number): Exhibit {
  return {
    id: `exhibit-${index}`,
    title: `Exhibit ${index}`,
    description: `Description ${index}`,
    year: 2025,
    thumbnailUrl: `assets/exhibit-${index}.png`,
    intelligenceTypes: ['human'],
    visualizationUrl: `visualization-${index}`,
  };
}

describe('KioskCardCarousel', () => {
  function spyOnSwiperInitialization() {
    register();
    const SwiperElement = customElements.get('swiper-container');

    if (!SwiperElement) {
      throw new Error('Expected Swiper to register its container custom element.');
    }

    return vi.spyOn(SwiperElement.prototype as SwiperContainer, 'initialize').mockImplementation(() => undefined);
  }

  async function setup(exhibits: Exhibit[], cardsPerSlide = 8) {
    const initialize = spyOnSwiperInitialization();
    const renderResult = await render(KioskCardCarousel, {
      inputs: { exhibits, cardsPerSlide },
      providers: [
        { provide: FocusMonitor, useValue: { monitor: vi.fn(() => EMPTY), stopMonitoring: vi.fn() } },
        { provide: MatRippleLoader, useValue: { configureRipple: vi.fn(), destroyRipple: vi.fn() } },
      ],
    });

    return { ...renderResult, initialize };
  }

  afterEach(() => vi.restoreAllMocks());

  it('groups exhibits into slides of the configured size', async () => {
    const exhibits = Array.from({ length: 5 }, (_, index) => createExhibit(index + 1));
    const { container, fixture } = await setup(exhibits, 2);

    expect(container.querySelectorAll('swiper-slide')).toHaveLength(3);
    expect(screen.getAllByRole('link')).toHaveLength(5);

    fixture.componentRef.setInput('cardsPerSlide', 3);
    fixture.detectChanges();

    expect(container.querySelectorAll('swiper-slide')).toHaveLength(2);
  });

  it('renders no slides when there are no exhibits', async () => {
    const { container } = await setup([]);

    expect(container.querySelectorAll('swiper-slide')).toHaveLength(0);
  });

  it('initializes Swiper with keyboard, accessibility, and rendered control elements', async () => {
    const { container, initialize } = await setup([createExhibit(1)]);
    const swiper = container.querySelector<SwiperContainer>('swiper-container');
    const [previousButton, nextButton] = screen.getAllByRole('button');

    expect(swiper).not.toBeNull();
    await waitFor(() => expect(initialize).toHaveBeenCalledOnce());
    expect(swiper).toMatchObject({
      a11y: true,
      keyboard: true,
      loop: true,
      observer: true,
      slidesPerView: 1,
      navigation: { nextEl: nextButton, prevEl: previousButton },
      pagination: { clickable: true, type: 'bullets' },
    });
  });
});
