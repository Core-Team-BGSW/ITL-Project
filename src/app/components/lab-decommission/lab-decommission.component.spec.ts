import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDecommissionComponent } from './lab-decommission.component';

describe('LabDecommissionComponent', () => {
  let component: LabDecommissionComponent;
  let fixture: ComponentFixture<LabDecommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabDecommissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabDecommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
