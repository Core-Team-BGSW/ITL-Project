import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxsubmitComponent } from './dialogboxsubmit.component';

describe('DialogboxsubmitComponent', () => {
  let component: DialogboxsubmitComponent;
  let fixture: ComponentFixture<DialogboxsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxsubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogboxsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
