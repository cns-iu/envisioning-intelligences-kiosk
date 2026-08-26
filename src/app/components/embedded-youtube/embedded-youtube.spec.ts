import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbeddedYoutube } from './embedded-youtube';

describe('EmbeddedYoutube', () => {
  let component: EmbeddedYoutube;
  let fixture: ComponentFixture<EmbeddedYoutube>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbeddedYoutube],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbeddedYoutube);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
