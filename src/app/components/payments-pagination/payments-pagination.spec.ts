import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPagination } from './payments-pagination';

describe('PaymentsPagination', () => {
  let component: PaymentsPagination;
  let fixture: ComponentFixture<PaymentsPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
