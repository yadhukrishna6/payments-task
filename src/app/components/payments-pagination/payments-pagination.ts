import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-payments-pagination',
  imports: [],
  templateUrl: './payments-pagination.html',
  styleUrl: './payments-pagination.css',
})
export class PaymentsPagination {
@Input({ required: true })
  currentPage = 1;

  @Input({ required: true })
  totalPages = 1;

  @Output()
  pageChange = new EventEmitter<number>();

  previous(): void {

    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  next(): void {

    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

}
