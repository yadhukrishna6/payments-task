import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { PaymentStatus } from '../../payments.service';

@Component({
  selector: 'app-payments-status-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payments-status-filter.html',
  styleUrl: './payments-status-filter.css',
})
export class PaymentsStatusFilter implements OnInit, OnDestroy {
  @Output() searchChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<'all' | PaymentStatus>();

  readonly searchControl = new FormControl('', { nonNullable: true });
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.searchChange.emit(value);
      });
  }

  onStatusSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.statusChange.emit(selectElement.value as 'all' | PaymentStatus);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
