import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdecommissionComponent } from './dialogdecommission.component';

describe('DialogdecommissionComponent', () => {
  let component: DialogdecommissionComponent;
  let fixture: ComponentFixture<DialogdecommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogdecommissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogdecommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
