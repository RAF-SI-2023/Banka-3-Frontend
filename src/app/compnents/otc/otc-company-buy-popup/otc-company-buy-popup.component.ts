import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExchangeService} from "../../../services/exchange.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-otc-company-buy-popup',
  templateUrl: './otc-company-buy-popup.component.html',
  styleUrls: ['./otc-company-buy-popup.component.css']
})
export class OtcCompanyBuyPopupComponent {
  sellerId: number = 0;
  buyerId: number = 0;
  ticker: string = ''
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
    if (data) {
      this.sellerId = data.sellerId;
      let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
      this.buyerId = tk.id;
      this.ticker = data.ticker;
      this.amount = data.amount;
      this.stock = data.stock;
      this.price = data.price;
    }
  }

  confirm() {
    this.exchangeService.buyCompanyStockOtc(this.sellerId, this.buyerId, this.ticker, this.amount, this.price).subscribe( data => {
      this.openSuccessSnackBar("Uspešno poslata ponuda.")
      this.dialog.close();
    })
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
