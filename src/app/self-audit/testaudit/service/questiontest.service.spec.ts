import { TestBed } from '@angular/core/testing';

import { QuestiontestService } from './questiontest.service';

describe('QuestiontestService', () => {
  let service: QuestiontestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestiontestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
