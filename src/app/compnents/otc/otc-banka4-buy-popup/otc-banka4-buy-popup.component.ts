import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ExchangeService} from "../../../services/exchange.service";
import { StockBanka4 } from 'src/app/models/models';

@Component({
  selector: 'app-otc-banka4-buy-popup',
  templateUrl: './otc-banka4-buy-popup.component.html',
  styleUrls: ['./otc-banka4-buy-popup.component.css']
})
export class OtcBanka4BuyPopupComponent {
  amount: number = 0;
  stock = {} as StockBanka4
  price: number = 0;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService
) {
    if (data && data.stock) {
      this.stock = data.stock;
      console.log(this.stock)
    }
  }

  confirm() {

    if(this.amount <= 0 || this.price <= 0 || this.stock.amount < this.amount){
      return;
    }
    this.exchangeService.makeBank4Offer(this.stock.ticker, this.amount, this.price).subscribe(
      (response) => {
        this.openSuccessSnackBar("Uspešna kupovina.");
        this.dialog.close();
        this.router.navigate(['otc-banka4']);
      },
      (error) => {
        console.error('Nemate dovoljno sredstava:', error);
        this.openSuccessSnackBar("Neuspešna kupovina.");
        this.dialog.close();
        this.router.navigate(['otc-banka4']);
      },
      )
  }

  validateAmount() {
      if (isNaN(this.amount)) {
        this.amount = 0;
      } else if (this.amount < 0) {
        this.amount = 0;
      } else if (this.stock.amount < this.amount) {
        this.amount = this.amount;
      }
  }
  validatePrice() {
      if (isNaN(this.price)) {
        this.price = 0;
      } else if (this.price < 0) {
        this.price = this.price;
      }
  }


  cancel() {
    this.dialog.close();
  }

  openSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }


}
