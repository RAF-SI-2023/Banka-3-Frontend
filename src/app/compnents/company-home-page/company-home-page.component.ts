import {Component, OnInit} from '@angular/core';
import {AccountDto, TransactionDto} from "../../models/models";
import {Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-company-home-page',
  templateUrl: './company-home-page.component.html',
  styleUrls: ['./company-home-page.component.css']
})
export class CompanyHomePageComponent implements OnInit{
  accountNumber: string= ''; // Variable for account number
  availableBalance: string = ''; // Variable for available balance
  type: string = ''; // Variable for account type
  selectedAccount = {} as AccountDto;
  transactions = [] as TransactionDto[]

  accounts2 = [] as AccountDto[]

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getCompanyAccountsByCompanyId(tk.id).subscribe(res => {
      this.accounts2 = res;
      this.selectedAccount = this.accounts2[0];
      // console.log(this.accounts2)
      this.updateTransactions()
    })
  }

  nextAccount() {
    const currentIndex = this.accounts2.indexOf(this.selectedAccount);
    const nextIndex = (currentIndex + 1) % this.accounts2.length;
    this.selectedAccount = this.accounts2[nextIndex];
    this.updateTransactions()
  }

  previousAccount() {
    const currentIndex = this.accounts2.indexOf(this.selectedAccount);
    const previousIndex = (currentIndex - 1 + this.accounts2.length) % this.accounts2.length;
    this.selectedAccount = this.accounts2[previousIndex];
    this.updateTransactions()

  }

  //TODO mozda ce trebati da se promeni u zavisnosti kako backend odluci da odradi ovo
  redirectToTransaction(transaction: TransactionDto){
    this.router.navigate(['/transaction-details'], { queryParams: { transaction: JSON.stringify(transaction) } });
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

  //TODO Treba da se promeni putanja u servisu za dohvatanje transakcija kompanije (mozda?)
  updateTransactions() {
      console.log(this.selectedAccount)
      this.accountService.getAllTransactionsByAccountId(this.selectedAccount.accountNumber).subscribe(res => {
        this.transactions = res;
      })
    // this.transactions = this.selectedAccount;
  }

  // displayDetails() {
  //   const account=this.selectedAccount;
  //   this.router.navigate(['/bill'], { state: { account: account } });
  // }

  protected readonly Date = Date;
}
