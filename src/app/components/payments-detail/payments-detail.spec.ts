import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDetail } from './payments-detail';

describe('PaymentsDetail', () => {
  let component: PaymentsDetail;
  let fixture: ComponentFixture<PaymentsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
