import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KioskCardCarouselControls } from './kiosk-card-carousel-controls';

describe('KioskCardCarouselControls', () => {
  let component: KioskCardCarouselControls;
  let fixture: ComponentFixture<KioskCardCarouselControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskCardCarouselControls],
    }).compileComponents();

    fixture = TestBed.createComponent(KioskCardCarouselControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
