import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareTrackingComponent } from './software-tracking.component';

describe('SoftwareTrackingComponent', () => {
  let component: SoftwareTrackingComponent;
  let fixture: ComponentFixture<SoftwareTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
