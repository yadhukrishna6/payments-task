import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../payments.service';
import { formatCurrency, formatDate, getMethodLabel } from '../../utils/formatters';

@Component({
  selector: 'app-payments-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-detail.html',
  styleUrl: './payments-detail.css',
})
export class PaymentsDetail {
  @Input({ required: true }) payment!: Payment;
  @Output() close = new EventEmitter<void>();

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    this.onClose();
  }

  get netAmount(): number {
    return this.payment.amount - this.payment.fee;
  }

  formatAmount(amount: number, currency: string): string {
    return formatCurrency(amount, currency);
  }

  formatDate(dateStr: string): string {
    return formatDate(dateStr);
  }

  formatMethod(method: Payment['method']): string {
    return getMethodLabel(method);
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('drawer-backdrop')) {
      this.onClose();
    }
  }
}
