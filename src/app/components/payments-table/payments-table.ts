import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payment, PaymentMethod } from '../../payments.service.ts';

@Component({
  selector: 'app-payments-table',
  imports: [],
  templateUrl: './payments-table.html',
  styleUrl: './payments-table.css',
})
export class PaymentsTable {
 @Input ({ required : true })payments :Payment[] =[];
 
 @Output() paymentClick = new EventEmitter<Payment>();

 onRowClick(payment : Payment):void{
  this.paymentClick.emit(payment);
 }

 
 getMethodLabel(method: PaymentMethod): string {

  const labels: Record<PaymentMethod, string> = {
    ach: 'ACH',
    wire: 'Wire',
    card: 'Card',
    check: 'Check'
  };

  return labels[method];
}
}
