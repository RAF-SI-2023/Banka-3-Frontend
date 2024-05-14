import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ExchangeService} from "../../../services/exchange.service";

@Component({
  selector: 'app-otc-buy-popup',
  templateUrl: './otc-buy-popup.component.html',
  styleUrls: ['./otc-buy-popup.component.css']
})
export class OtcBuyPopupComponent {
  amount: number = 0;
  stock: string = '';
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
    // this.exchangeService.buy(this.amount, this.price).subscribe(
    //   (response) => {
    //     this.openSuccessSnackBar("Uspešna kupovina.");
    //     this.dialog.close();
    //     this.router.navigate(['listing-list']);
    //   },
    //   (error) => {
    //     console.error('Nemate dovoljno sredstava:', error);
    //     this.openSuccessSnackBar("Neuspešna kupovina.");
    //     this.dialog.close();
    //     this.router.navigate(['listing-list']);
    //   },
    // )

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
