import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAuditComponent } from './self-audit.component';

describe('SelfAuditComponent', () => {
  let component: SelfAuditComponent;
  let fixture: ComponentFixture<SelfAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfAuditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});