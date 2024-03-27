import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credit } from '../models/models';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent {
  credits: Credit[] = [];

  constructor(private router: Router) {
    this.fetchMockCredits();
  }

  sortCredits(sortOption: string) {
    if (sortOption === 'asc') {
      this.credits.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === 'desc') {
      this.credits.sort((a, b) => b.amount - a.amount);
    }
  }

  fetchMockCredits() {
    const mockCredits: Credit[] = [
      { 
        name: 'Credit 1',
        accountNumber: '1234567890',
        amount: 5000,
        paymentPeriod: 12,
        fee: 50,
        startDate: 20230101,
        endDate: 20231231,
        monthlyFee: 5,
        remainingAmount: 4500,
        currencyMark: 'USD'
      },
      { 
        name: 'Credit 2',
        accountNumber: '0987654321',
        amount: 8000,
        paymentPeriod: 24,
        fee: 80,
        startDate: 20240101,
        endDate: 20251231,
        monthlyFee: 10,
        remainingAmount: 7200,
        currencyMark: 'EUR'
      }
    ];

    this.credits = mockCredits;
  }


  sortByPriceAsc() {
    this.credits.sort((a, b) => a.amount - b.amount);
  }

  sortByPriceDesc() {
    this.credits.sort((a, b) => b.amount - a.amount);
  }

}
