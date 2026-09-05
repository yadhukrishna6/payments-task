import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, delay, map } from "rxjs";

export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";
export type PaymentMethod = "ach" | "wire" | "card" | "check";

export interface Payment {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
  description: string;
  fee: number;
}

@Injectable({ providedIn: "root" })
export class PaymentsService {
  private http = inject(HttpClient);

  /** Acts like a real API call: takes ~600ms, fails ~20% of the time. */
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>("/assets/payments.json").pipe(
      delay(600),
      map((rows) => {
        if (Math.random() < 0.2) throw new Error("Failed to load payments");
        return rows;
      })
    );
  }
}