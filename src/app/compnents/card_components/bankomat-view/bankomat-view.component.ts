import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from "../../../services/exchange.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators'; //
import { Observable } from 'rxjs';
import {AccountService} from "../../../services/account.service";
import { AccountDto } from 'src/app/models/models';
import { parseJson } from '@angular/cli/src/utilities/json-file';


@Component({
  selector: 'app-bankomat-view',
  templateUrl: './bankomat-view.component.html',
  styleUrls: ['./bankomat-view.component.css']
})
export class BankomatViewComponent implements OnInit {

  uplata = true;
  isplata = false;
  accountNumber: string = '';
  amount: number=0;
  accounts = [] as AccountDto[]
  selectedAccount = {} as AccountDto;


  constructor(
    private route: ActivatedRoute,
    private exchange: ExchangeService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'] ?? '';
    });
    this.getAllAccounts();

  }

  getAllAccounts(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getAccountsByUserId(tk.id).subscribe(res => {
      this.accounts = res;
      if (this.accounts.length > 0) {
        this.selectedAccount = this.accounts[0];
      }
    })
  }

  onAccountChange(account: AccountDto): void {
    this.selectedAccount = account;
  }  

  switchToOptions(optionType: string): void {
    this.loadOptions(optionType);
  }

  loadOptions(optionType: string): void {
    if (optionType === 'call') {
      this.uplata = true;
      this.isplata = false;
    } else if (optionType === 'put') {
      this.uplata = false;
      this.isplata = true;
    }
  }

  isValidAmount(): boolean {
    const num = parseFloat(this.amount?.toString());
    return !isNaN(num) && num > 0;
  }
  

  sendTransactionRequest(): void {
    if (!this.amount || this.amount == 0) {
      this.snackBar.open('Iznos ne može biti prazan ili jednak nuli.', 'Zatvori', {
        duration: 3000
      });
      return;
    }
  
    let requestObservable: Observable<any> | null = null;
  
    if (this.uplata) {
      requestObservable = this.accountService.sendDepositRequest(this.selectedAccount.accountNumber, this.amount);
    } else if (this.isplata) {
      requestObservable = this.accountService.sendWithdrawRequest(this.selectedAccount.accountNumber, this.amount);
    }
  
    if (requestObservable) {
      requestObservable.subscribe({
        next: (response) => {
          this.snackBar.open('Transakcija je uspešno izvršena.', 'Zatvori', {
            duration: 3000,
          });
          this.router.navigate(['']);
        },
        error: (error) => {
          this.snackBar.open('Došlo je do greške prilikom izvršavanja transakcije.', 'Zatvori', {
            duration: 3000,
          });
        },
      });
    }
  }
  
}
