import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AccountDto, TransactionDto} from "../../models/models";
import {AccountService} from "../../services/account.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  ownerName: string = ''; // Variable for owner name
  accountNumber: string= ''; // Variable for account number
  availableBalance: string = ''; // Variable for available balance
  type: string = ''; // Variable for account type
  accountState: string = ''; // Variable for account state
  reservedFunds: string = ''; // Variable for reserved funds
  selectedCurrency1: string= "EUR";
  selectedCurrency2: string= "USD";
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
  currency1: number = 0;
  currency2: number = 0;
  transactions = [] as TransactionDto[];
  selectedAccount = {} as AccountDto;

  accounts2 = [] as AccountDto[]

  constructor(private router: Router, private accountService: AccountService) {

    // this.updateTransactions() // Selecting the first account

  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getAccountsByUserId(tk.id).subscribe(res => {
      this.accounts2 = res;
      this.selectedAccount = this.accounts2[0];
      // console.log(this.accounts2)
      this.updateTransactions()
    })
  }

  getIconClass(transactionAmount: number): string {
    return transactionAmount > 0 ? 'incoming' : 'outgoing';
  }

  getTransactionClass(transactionAmount: number): string {
    return transactionAmount > 0 ? 'incoming' : 'outgoing';
  }

   backToMain() {
    const modalWrapper = document.querySelector('.myModalWrapper') as HTMLElement;
    if (modalWrapper) {
        modalWrapper.style.display = 'none';
    } else {
        console.error('Modal wrapper element not found.');
    }
}


  nextAccount() {
    const currentIndex = this.accounts2.indexOf(this.selectedAccount);
    const nextIndex = (currentIndex + 1) % this.accounts2.length;
    this.selectedAccount = this.accounts2[nextIndex];
   this.updateTransactions();
  }

  getDayFromDate(dateString: number): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  // Method to get the month from the date string (textual representation)
  getMonthFromDate(dateString: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  }

  // Method to get the year from the date string
  getYearFromDate(dateString: number): number {
    const date = new Date(dateString);
    return date.getFullYear();
  }

  previousAccount() {
    const currentIndex = this.accounts2.indexOf(this.selectedAccount);
    const previousIndex = (currentIndex - 1 + this.accounts2.length) % this.accounts2.length;
    this.selectedAccount = this.accounts2[previousIndex];

   this.updateTransactions();
  }


  // updateTransactions() {
  //   // this.accountService.getTransactions(this.selectedAccount.id).subscribe(transactions => {
  //   //   this.transactions = transactions;
  //   // });
  //   // this.transactions=this.selectedAccount.transactions;
  // }

  updateTransactions() {
      console.log(this.selectedAccount)
      this.accountService.getAllTransactionsByAccountId(this.selectedAccount.accountNumber).subscribe(res => {
        this.transactions = res;
      })
    // this.transactions = this.selectedAccount;
  }
  displayDetails() {
    const account= this.selectedAccount;
    console.log(account)
    this.router.navigate(['/bill'], { state: { account: account } });
  }

  newPayment() {
    window.location.reload();
  }

  redirectToTransaction(transaction: TransactionDto): void {
    this.router.navigate(['/transaction-details'], { queryParams: { transaction: JSON.stringify(transaction) } });
  }
  protected readonly Date = Date;

}
