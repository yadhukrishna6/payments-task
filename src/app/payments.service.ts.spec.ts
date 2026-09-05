import { TestBed } from '@angular/core/testing';

import { PaymentsServiceTs } from './payments.service.ts';

describe('PaymentsServiceTs', () => {
  let service: PaymentsServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
