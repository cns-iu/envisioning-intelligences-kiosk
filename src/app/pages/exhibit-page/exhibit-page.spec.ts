import { ComponentFixture, TestBed } from '@angular/core/testing';
import ExhibitPage from './exhibit-page';

describe('ExhibitPage', () => {
  let component: ExhibitPage;
  let fixture: ComponentFixture<ExhibitPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExhibitPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
