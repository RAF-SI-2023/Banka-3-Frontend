import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditService } from '../services/credit.service';
import { Credit } from '../models/models';

@Component({
  selector: 'app-credit-transaction',
  templateUrl: './credit-transaction.component.html',
  styleUrls: ['./credit-transaction.component.css']
})
export class CreditTransactionComponent implements OnInit {
  transactions: any[] = [];
  selectedCredit: Credit | null = null;

  constructor(
    private route: ActivatedRoute,
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const creditId = params['creditId'];
      if (creditId) {
        this.creditService.getCreditDetails(creditId).subscribe(credit => {
          this.selectedCredit = credit;
          this.transactions = credit?.transactions || []; // Access transactions only if credit is not null
        });
      }
    });
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
}