import { Component } from '@angular/core';
import { PaymentsPage } from './components/payments-page/payments-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaymentsPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
