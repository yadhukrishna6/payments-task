import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsStatusFilter } from './payments-status-filter';

describe('PaymentsStatusFilter', () => {
  let component: PaymentsStatusFilter;
  let fixture: ComponentFixture<PaymentsStatusFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsStatusFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsStatusFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
