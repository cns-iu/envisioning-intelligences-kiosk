import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmbeddedVisualization } from './embedded-visualization';

describe('EmbeddedVisualization', () => {
  let component: EmbeddedVisualization;
  let fixture: ComponentFixture<EmbeddedVisualization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbeddedVisualization],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbeddedVisualization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
