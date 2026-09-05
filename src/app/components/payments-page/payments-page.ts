import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment, PaymentsService, PaymentStatus } from '../../payments.service';
import { PaymentsStatusFilter } from '../payments-status-filter/payments-status-filter';
import { PaymentsTable } from '../payments-table/payments-table';
import { PaymentsPagination } from '../payments-pagination/payments-pagination';
import { PaymentsDetail } from '../payments-detail/payments-detail';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [
    CommonModule,
    PaymentsStatusFilter,
    PaymentsTable,
    PaymentsPagination,
    PaymentsDetail,
  ],
  templateUrl: './payments-page.html',
  styleUrl: './payments-page.css',
})
export class PaymentsPage implements OnInit {
  private readonly paymentsService = inject(PaymentsService);

  readonly payments = signal<Payment[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<boolean>(false);
  readonly searchTerm = signal<string>('');
  readonly selectedStatus = signal<'all' | PaymentStatus>('all');
  readonly currentPage = signal<number>(1);
  readonly pageSize = 10;
  readonly selectedPayment = signal<Payment | null>(null);

  readonly filteredPayments = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();

    return this.payments().filter((payment) => {
      const matchesSearch =
        !search ||
        payment.customerName.toLowerCase().includes(search) ||
        payment.reference.toLowerCase().includes(search);
      const matchesStatus = status === 'all' || payment.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  readonly totalPages = computed(() => {
    const count = this.filteredPayments().length;
    return count === 0 ? 1 : Math.ceil(count / this.pageSize);
  });

  readonly paginatedPayments = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredPayments().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading.set(true);
    this.error.set(false);

    this.paymentsService.getPayments().subscribe({
      next: (data) => {
        this.payments.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  onStatusChange(status: 'all' | PaymentStatus): void {
    this.selectedStatus.set(status);
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  onSelectPayment(payment: Payment): void {
    this.selectedPayment.set(payment);
  }

  onCloseDetails(): void {
    this.selectedPayment.set(null);
  }
}
