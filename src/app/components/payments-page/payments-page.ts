import { Component, computed, inject, signal } from '@angular/core';
import { Payment, PaymentsService, PaymentStatus } from '../../payments.service.ts';
import { single } from 'rxjs';

@Component({
  selector: 'app-payments-page',
  imports: [],
  templateUrl: './payments-page.html',
  styleUrl: './payments-page.css',
})
export class PaymentsPage {


  private readonly paymentService = inject(PaymentsService);
  readonly payments = signal<Payment[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly searchTerm = signal('');
  readonly selectedStatus = signal<'all' | PaymentStatus>('all');
  readonly currentPage = signal(1);
  readonly pageSize = 10;
  readonly selectedPayment = signal<Payment | null>(null);
  readonly filteredPayments = computed(() => {

    const search = this.searchTerm().toLowerCase().trim();
    const status = this.selectedStatus();
    return this.payments().filter(payment => {
      const matchSerch = !search || payment.customerName.toLowerCase().includes(search) || payment.reference.toLowerCase().includes(search);

      const matchStatus = status === 'all' || payment.status === status;
      return matchSerch && matchStatus;
    });
  });


  readonly paginatedPayments = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;

    return this.filteredPayments().slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() => {
    return Math.ceil(this.filteredPayments().length / this.pageSize);
  });

// loadingPayments
  loadPayments(){
    this.loading.set(true);
    this.error.set(false);

    this.paymentService.getPayments().subscribe({
      next:payments => {
        this.payments.set(payments);
        this.loading.set(false);
      },
      error : () =>{
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  // OnSearch
  onSearch(value:string):void{
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  //onStatusChange
  onStatusChange(status:'all' | PaymentStatus):void{
    this.selectedStatus.set(status);
    this.currentPage.set(1);
  }

  // goToPage
  goToPage(page:number):void{
    this.currentPage.set(page);
  }

// selectpayment
selectpayment(payment: Payment): void {
  this.selectedPayment.set(payment);
}

closeDetails():void{
  this.selectedPayment.set(null);
}



}
