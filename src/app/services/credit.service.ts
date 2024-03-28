import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credit } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private credits: Credit[] = [
    { 
      id: 1,
      name: 'Credit 1',
      accountNumber: '1234567890',
      amount: 5000,
      paymentPeriod: 12,
      fee: 50,
      startDate: 20230101,
      endDate: 20231231,
      monthlyFee: 5,
      remainingAmount: 4500,
      currencyMark: 'USD',
      transactions: [
        { id: 1, date: '2024-03-18', description: 'Payment received', amount: 500, tradeAccount:"340-000100003632-87" },
        { id: 2, date: '2024-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"340-000100003632-87"  },
        { id: 3, date: '2024-03-16', description: 'Withdrawal', amount: -200, tradeAccount:"340-000100003632-87"  },
        { id: 4, date: '2024-03-15', description: 'Deposit', amount: 1000, tradeAccount:"340-000100003632-87"  }
      ]
    },
    { 
      id: 2,
      name: 'Credit 2',
      accountNumber: '0987654321',
      amount: 8000,
      paymentPeriod: 24,
      fee: 80,
      startDate: 20240101,
      endDate: 20251231,
      monthlyFee: 10,
      remainingAmount: 7200,
      currencyMark: 'EUR',
      transactions: [
        { id: 1, date: '2024-03-21', description: 'Payment', amount: -500, tradeAccount:"340-000100003632-87" },
        { id: 2, date: '2024-03-11', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
        { id: 3, date: '2024-02-21', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
        { id: 4, date: '2024-02-13', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
      ]
    }
  ];

  constructor() { }

  getCreditDetails(creditId: number): Observable<Credit | null> {
    const credit = this.credits.find(c => c.id == creditId);
    return of(credit || null); // Return null if credit is not found
  }

  getAllCredits(): Observable<Credit[]> {
    return of(this.credits);
  }

  // getCreditDetails(creditId: number): Observable<Credit | null> {
  //   const url = `some-url/api/v1/credit/${creditId}`;
  //   return this.http.get<Credit>(url);
  // }
}