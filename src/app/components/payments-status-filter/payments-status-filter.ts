import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinct, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-payments-status-filter',
  imports: [],
  templateUrl: './payments-status-filter.html',
  styleUrl: './payments-status-filter.css',
})
export class PaymentsStatusFilter {

  @Output() searchChange =new EventEmitter<string>();
  @Output() statusChange =new EventEmitter<string>();


  readonly searchControl =new FormControl('',{
    nonNullable:true
  })

  private readonly destroy$ =new  Subject<void>();

  constructor (){
    this.searchControl.valueChanges.pipe(debounceTime(300),distinctUntilChanged(),takeUntil(this.destroy$)).subscribe(
      value =>{this.searchChange.emit(value);

      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
