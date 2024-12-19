import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestauditComponent } from './testaudit.component';

describe('TestauditComponent', () => {
  let component: TestauditComponent;
  let fixture: ComponentFixture<TestauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestauditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
