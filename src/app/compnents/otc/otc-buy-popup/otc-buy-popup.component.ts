import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ExchangeService} from "../../../services/exchange.service";
import { MyStock } from 'src/app/models/models';

@Component({
  selector: 'app-otc-buy-popup',
  templateUrl: './otc-buy-popup.component.html',
  styleUrls: ['./otc-buy-popup.component.css']
})
export class OtcBuyPopupComponent {
  amount: number = 0;
  stock = {} as MyStock
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
    }
  }

  confirm() {

    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    const hasRole = "role" in payload

    if(hasRole){
      console.log(this.amount)
      console.log(this.price)
      console.log(this.stock.amount)
      if(this.amount <= 0 || this.price <= 0 || this.stock.amount < this.amount){
        return;
      }
      this.exchangeService.buyCompanyStockOtc(this.stock.companyId, payload.id, this.stock.ticker,this.amount, this.price).subscribe(
        (response) => {
          this.openSuccessSnackBar("Uspešna kupovina.");
          this.dialog.close();
          this.router.navigate(['otc-company']);
        },
        (error) => {
          console.error('Nemate dovoljno sredstava:', error);
          this.openSuccessSnackBar("Neuspešna kupovina.");
          this.dialog.close();
          this.router.navigate(['otc-company']);
        },
      )
    }else{
      if(this.amount <= 0 || this.price <= 0 || this.stock.amount < this.amount){
        return;
      }
      this.exchangeService.buyUserStockOtc(this.stock.userId, payload.id, this.stock.ticker,this.amount, this.price).subscribe(
        (response) => {
          this.openSuccessSnackBar("Uspešna kupovina.");
          this.dialog.close();
          this.router.navigate(['otc']);
        },
        (error) => {
          console.error('Nemate dovoljno sredstava:', error);
          this.openSuccessSnackBar("Neuspešna kupovina.");
          this.dialog.close();
          this.router.navigate(['otc']);
        },
      )
    }

  }

  validateAmount() {
      if (isNaN(this.amount)) {
        this.amount = 0;
      } else if (this.amount < 0) {
        this.amount = 0;
      } else if (this.stock.publicAmount > this.amount) {
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
