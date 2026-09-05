import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../payments.service';
import { formatCurrency, formatDate, getMethodLabel } from '../../utils/formatters';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-table.html',
  styleUrl: './payments-table.css',
})
export class PaymentsTable {
  @Input({ required: true }) payments: Payment[] = [];
  @Output() paymentClick = new EventEmitter<Payment>();

  formatAmount(amount: number, currency: string): string {
    return formatCurrency(amount, currency);
  }

  formatDate(dateStr: string): string {
    return formatDate(dateStr);
  }

  formatMethod(method: Payment['method']): string {
    return getMethodLabel(method);
  }

  onRowClick(payment: Payment): void {
    this.paymentClick.emit(payment);
  }

  onRowKeydown(event: KeyboardEvent, payment: Payment): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.paymentClick.emit(payment);
    }
  }
}
