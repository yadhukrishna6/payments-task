import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payment } from '../../payments.service.ts';

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

 
 
}
