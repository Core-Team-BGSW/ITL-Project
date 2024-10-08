import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabCommissionComponent } from './lab_commission.component';

describe('LabCommissionComponent', () => {
  let component: LabCommissionComponent;
  let fixture: ComponentFixture<LabCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabCommissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
