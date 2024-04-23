import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeService } from "../../../services/exchange.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators'; //
import { Observable } from 'rxjs';
import {AccountService} from "../../../services/account.service";


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

  constructor(
    private route: ActivatedRoute,
    private exchange: ExchangeService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'] ?? '';
    });
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

  sendTransactionRequest(): void {
    let requestObservable: Observable<any> | null = null;

    if (this.uplata) {
      requestObservable = this.accountService.sendDepositRequest(this.accountNumber, this.amount);
    } else if (this.isplata) {
      requestObservable = this.accountService.sendWithdrawRequest(this.accountNumber, this.amount);
    }

    if (requestObservable) {
      requestObservable.subscribe({
        next: response => {
          this.snackBar.open('Transakcija je uspešno izvršena.', 'Zatvori', {
            duration: 3000
          });
        },
        error: error => {
          this.snackBar.open('Došlo je do greške prilikom izvršavanja transakcije.', 'Zatvori', {
            duration: 3000
          });
        }
      });
    }
  }
}
