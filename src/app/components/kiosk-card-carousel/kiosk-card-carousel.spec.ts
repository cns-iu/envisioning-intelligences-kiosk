import { FocusMonitor } from '@angular/cdk/a11y';
import { MatRippleLoader } from '@angular/material/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
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

  function mockSwiperAutoplay(swiper: SwiperContainer) {
    const start = vi.fn();

    Object.defineProperty(swiper, 'swiper', {
      configurable: true,
      value: { autoplay: { start } },
    });

    return start;
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

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

  it('initializes Swiper with autoplay, keyboard, accessibility, and rendered control elements', async () => {
    const { container, initialize } = await setup([createExhibit(1)]);
    const swiper = container.querySelector<SwiperContainer>('swiper-container');
    const [previousButton, nextButton] = screen.getAllByRole('button');

    expect(swiper).not.toBeNull();
    await waitFor(() => expect(initialize).toHaveBeenCalledOnce());
    expect(swiper).toMatchObject({
      a11y: true,
      autoplay: { delay: 10000, disableOnInteraction: true },
      keyboard: true,
      loop: true,
      observer: true,
      slidesPerView: 1,
      navigation: { nextEl: nextButton, prevEl: previousButton },
      pagination: { clickable: true, type: 'bullets' },
    });
  });

  it('restarts autoplay one minute after Swiper stops it', async () => {
    const { container } = await setup([createExhibit(1)]);
    const swiper = container.querySelector<SwiperContainer>('swiper-container');

    if (!swiper) {
      throw new Error('Expected the carousel to render a Swiper container.');
    }

    const startAutoplay = mockSwiperAutoplay(swiper);
    vi.useFakeTimers();

    fireEvent(swiper, new CustomEvent('swiperautoplaystop'));
    vi.advanceTimersByTime(59999);

    expect(startAutoplay).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(startAutoplay).toHaveBeenCalledOnce();
  });

  it('cancels a pending autoplay restart when destroyed', async () => {
    const { container, fixture } = await setup([createExhibit(1)]);
    const swiper = container.querySelector<SwiperContainer>('swiper-container');

    if (!swiper) {
      throw new Error('Expected the carousel to render a Swiper container.');
    }

    const startAutoplay = mockSwiperAutoplay(swiper);
    vi.useFakeTimers();

    fireEvent(swiper, new CustomEvent('swiperautoplaystop'));
    fixture.destroy();
    vi.advanceTimersByTime(60000);

    expect(startAutoplay).not.toHaveBeenCalled();
  });
});
