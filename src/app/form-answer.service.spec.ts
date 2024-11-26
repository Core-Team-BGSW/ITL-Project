import { TestBed } from '@angular/core/testing';

import { FormAnswerService } from './form-answer.service';

describe('FormAnswerService', () => {
  let service: FormAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
