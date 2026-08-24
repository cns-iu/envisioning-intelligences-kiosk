import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KioskCardCarouselSlide } from './kiosk-card-carousel-slide';

describe('KioskCardCarouselSlide', () => {
  let component: KioskCardCarouselSlide;
  let fixture: ComponentFixture<KioskCardCarouselSlide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskCardCarouselSlide],
    }).compileComponents();

    fixture = TestBed.createComponent(KioskCardCarouselSlide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
