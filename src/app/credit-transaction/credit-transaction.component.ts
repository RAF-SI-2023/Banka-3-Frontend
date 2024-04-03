// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-credit-transaction',
//   templateUrl: './credit-transaction.component.html',
//   styleUrls: ['./credit-transaction.component.css']
// })
// export class CreditTransactionComponent {
//   transactions: any[] = [];
//   selectedCredit: any;

//   credits = [
//     { id: '1', name: 'Gotovinski', accountNumber: '340-000100003632-87', amount: 1000, purpose: 'Kupovina stana', repaymentPeriod: '24 meseca',
//     transactions: [
//       { id: '1', date: '2024-03-18', description: 'Payment received', amount: 500, tradeAccount:"340-000100003632-87" },
//       { id: '2', date: '2024-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"340-000100003632-87"  },
//       { id: '3', date: '2024-03-16', description: 'Withdrawal', amount: -200, tradeAccount:"340-000100003632-87"  },
//       { id: '4', date: '2024-03-15', description: 'Deposit', amount: 1000, tradeAccount:"340-000100003632-87"  }
//     ] },
//     { id: '2', name: 'Gotovinski', accountNumber: '340-000100003632-87', amount: 500, purpose: 'Kupovina stana', repaymentPeriod: '24 meseca',
//     transactions: [
//       { id: '1', date: '2024-03-21', description: 'Payment', amount: -500, tradeAccount:"340-000100003632-87" },
//       { id: '2', date: '2024-03-11', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
//       { id: '3', date: '2024-02-21', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
//       { id: '4', date: '2024-02-13', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
//     ] },
//     { id: '3', name: 'Gotovinski', accountNumber: '340-000100003632-87', amount: 1500, purpose: 'Kupovina stana', repaymentPeriod: '24 meseca',
//     transactions: [
//       { id: '1', date: '2024-04-18', description: 'Payment received', amount: 500, tradeAccount:"11123142142" },
//       { id: '2', date: '2023-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
//       { id: '3', date: '2023-05-16', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
//       { id: '4', date: '2022-03-15', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
//     ] }
//   ];

//   constructor(private router: Router) {
//     this.selectedCredit = this.credits[0];
//     this.updateTransactions();
//     console.log(this.transactions);
//   }

//   getIconClass(transactionAmount: number): string {
//     return transactionAmount > 0 ? 'incoming' : 'outgoing';
//   }

//   getTransactionClass(transactionAmount: number): string {
//     return transactionAmount > 0 ? 'incoming' : 'outgoing';
//   }

//   getDayFromDate(dateString: string): number {
//     const date = new Date(dateString);
//     return date.getDate();
//   }

//   getMonthFromDate(dateString: string): string {
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     const date = new Date(dateString);
//     return months[date.getMonth()];
//   }

//   getYearFromDate(dateString: string): number {
//     const date = new Date(dateString);
//     return date.getFullYear();
//   }

//   updateTransactions() {
//     this.transactions = this.selectedCredit.transactions;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditService } from '../services/credit.service';
import {Credit, CreditRequestDto} from '../models/models';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-credit-transaction',
  templateUrl: './credit-transaction.component.html',
  styleUrls: ['./credit-transaction.component.css']
})
export class CreditTransactionComponent implements OnInit {
  transactions: any[] = [];
  selectedCredit: CreditRequestDto | null = null;
  isSubmittingApproval: boolean = false;
  isSubmittingRefusal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private creditService: CreditService,
    private snackBar: MatSnackBar
  ) {}

  //TODO Ovo jos nisu odradili na bekendu
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];

      if (userId) {
        this.creditService.getCreditDetails(userId).subscribe(credit => {
          this.selectedCredit = credit;
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

  approveCredit(){
    if (this.isSubmittingApproval){
      return;
    }
    this.isSubmittingApproval = true;
    this.creditService.approveCredit(this.selectedCredit!.creditRequestId, true).subscribe(res => {
      console.log(res)
      this.openErrorSnackBar('Odobrili ste kredit korisniku: ' +  this.selectedCredit!.user!.firstName + " " + this.selectedCredit!.user!.lastName);
    }, error => {
      this.openErrorSnackBar('Doslo je do greske!');
      console.log(error)
    },
      () => {
        setTimeout( ()=> {
          this.isSubmittingApproval = false;
        }, 3000);
      })
  }

  declineCredit(){
    if (this.isSubmittingRefusal){
      return;
    }
    this.isSubmittingRefusal = true;
    this.creditService.approveCredit(this.selectedCredit!.creditRequestId, false).subscribe(res => {
      this.openErrorSnackBar('Odbili ste kredit korisniku: ' +  this.selectedCredit!.user!.firstName + " " + this.selectedCredit!.user!.lastName);
      console.log(res)
    }, error => {
      this.openErrorSnackBar('Doslo je do greske!');
      console.log(error)
    },
      () => {
        setTimeout( ()=> {
          this.isSubmittingRefusal = false;
        }, 3000);
      })
  }


  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 0,
    });
  }

}
