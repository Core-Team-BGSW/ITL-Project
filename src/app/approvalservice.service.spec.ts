import { TestBed } from '@angular/core/testing';

import { ApprovalserviceService } from './approvalservice.service';

describe('ApprovalserviceService', () => {
  let service: ApprovalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
