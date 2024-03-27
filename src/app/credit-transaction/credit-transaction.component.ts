import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-transaction',
  templateUrl: './credit-transaction.component.html',
  styleUrls: ['./credit-transaction.component.css']
})
export class CreditTransactionComponent {
  transactions: any[] = [];
  selectedCredit: any;

  credits = [
    { id: '1', name: 'Gotovinski', accountNumber: '340-000100003632-87', amount: 1000, purpose: 'Kupovina stana', repaymentPeriod: '24 meseca',     
    transactions: [
      { id: '1', date: '2024-03-18', description: 'Payment received', amount: 500, tradeAccount:"340-000100003632-87" },
      { id: '2', date: '2024-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"340-000100003632-87"  },
      { id: '3', date: '2024-03-16', description: 'Withdrawal', amount: -200, tradeAccount:"340-000100003632-87"  },
      { id: '4', date: '2024-03-15', description: 'Deposit', amount: 1000, tradeAccount:"340-000100003632-87"  }
    ] },
    { id: '2', name: 'Gotovinski', accountNumber: '340-000100003632-87', amount: 500, purpose: 'Kupovina stana', repaymentPeriod: '24 meseca',     
    transactions: [
      { id: '1', date: '2024-03-21', description: 'Payment', amount: -500, tradeAccount:"340-000100003632-87" },
      { id: '2', date: '2024-03-11', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
      { id: '3', date: '2024-02-21', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
      { id: '4', date: '2024-02-13', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
    ] },
    { id: '3', name: 'Gotovinski', accountNumber: '340-000100003632-87', amount: 1500, purpose: 'Kupovina stana', repaymentPeriod: '24 meseca',     
    transactions: [
      { id: '1', date: '2024-04-18', description: 'Payment received', amount: 500, tradeAccount:"11123142142" },
      { id: '2', date: '2023-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
      { id: '3', date: '2023-05-16', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
      { id: '4', date: '2022-03-15', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
    ] }
  ];

  constructor(private router: Router) {
    this.selectedCredit = this.credits[0];
    this.updateTransactions();
    console.log(this.transactions);
  }

  getIconClass(transactionAmount: number): string {
    return transactionAmount > 0 ? 'incoming' : 'outgoing';
  }

  getTransactionClass(transactionAmount: number): string {
    return transactionAmount > 0 ? 'incoming' : 'outgoing';
  }

  getDayFromDate(dateString: string): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  getMonthFromDate(dateString: string): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  }

  getYearFromDate(dateString: string): number {
    const date = new Date(dateString);
    return date.getFullYear();
  }

  updateTransactions() {
    this.transactions = this.selectedCredit.transactions;
  }
}
