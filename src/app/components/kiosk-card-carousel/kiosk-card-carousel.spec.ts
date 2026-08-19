import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KioskCardCarousel } from './kiosk-card-carousel';

describe('KioskCardCarousel', () => {
  let component: KioskCardCarousel;
  let fixture: ComponentFixture<KioskCardCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskCardCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(KioskCardCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
