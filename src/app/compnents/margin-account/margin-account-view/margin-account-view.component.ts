import {Component, OnInit} from '@angular/core';
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {AccountService} from "../../../services/account.service";
import {MarginAccount, TransactionDto} from "../../../models/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-margin-account-view',
  templateUrl: './margin-account-view.component.html',
  styleUrls: ['./margin-account-view.component.css']
})
export class MarginAccountViewComponent implements OnInit{

  account = {} as MarginAccount;
  accountEmail = ''
  transactions = [] as TransactionDto[];

  constructor(private accountService: AccountService, private router: Router){
    //Mock podaci za racun, skloniti kada se doda ruta na beku
    // this.account = account

  }

  ngOnInit() {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountEmail = tk.sub
    if (tk.role && tk.role === 'ROLE_COMPANY'){
      this.accountService.getMarginAccountForCompany(tk.id).subscribe( data => {
        this.account = data;
        //Otkomentarisati kada se odradi ruta na beku
        this.updateTransactions()
        // this.account = data
      })
    } else {
      this.accountService.getMarginAccountForUser(tk.id).subscribe( data => {
        this.account = data;
        this.updateTransactions()
        //Otkomentarisati kada se odradi ruta na beku
        // this.account = data
      })
    }
  }

  updateTransactions() {
    this.accountService.getAllMarginTransactionsByAccountId(this.account.accountNumber).subscribe(res => {
      this.transactions = res;
    });
  }
  redirectToTransaction(transaction: TransactionDto): void {
    this.router.navigate(['/transaction-details'], { queryParams: { transaction: JSON.stringify(transaction) } });
  }
  getDayFromDate(dateString: number): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  getMonthFromDate(dateString: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  }

  getYearFromDate(dateString: number): number {
    const date = new Date(dateString);
    return date.getFullYear();
  }

}
