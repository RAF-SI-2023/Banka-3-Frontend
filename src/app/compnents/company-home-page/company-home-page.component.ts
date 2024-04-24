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

  accounts2 = [] as AccountDto[]

  constructor(private router: Router, private accountService: AccountService) {
  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getCompanyAccountsByCompanyId(tk.id).subscribe(res => {
      this.accounts2 = res;
      this.selectedAccount = this.accounts2[0];
      // console.log(this.accounts2)
    })
  }

  nextAccount() {
    const currentIndex = this.accounts2.indexOf(this.selectedAccount);
    const nextIndex = (currentIndex + 1) % this.accounts2.length;
    this.selectedAccount = this.accounts2[nextIndex];
  }

  previousAccount() {
    const currentIndex = this.accounts2.indexOf(this.selectedAccount);
    const previousIndex = (currentIndex - 1 + this.accounts2.length) % this.accounts2.length;
    this.selectedAccount = this.accounts2[previousIndex];

  }

  // displayDetails() {
  //   const account=this.selectedAccount;
  //   this.router.navigate(['/bill'], { state: { account: account } });
  // }

  protected readonly Date = Date;
}
