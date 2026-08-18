import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntelligenceTypeChip } from './intelligence-type-chip';

describe('IntelligenceTypeChip', () => {
  let component: IntelligenceTypeChip;
  let fixture: ComponentFixture<IntelligenceTypeChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntelligenceTypeChip],
    }).compileComponents();

    fixture = TestBed.createComponent(IntelligenceTypeChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
