import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'app-sell-hartije-popup',
  templateUrl: './sell-hartije-popup.component.html',
  styleUrls: ['./sell-hartije-popup.component.css']
})
export class SellHartijePopupComponent {

  selectedQuantity: number = 0;
  selectedOrderType: string = '';
  estimatedPrice: number = 0;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService
  ) {
    if (data && data.selectedOrderType && data.selectedQuantity && data.estimatedPrice) {
      this.selectedOrderType = data.selectedOrderType;
      this.selectedQuantity = data.selectedQuantity;
      this.estimatedPrice = data.estimatedPrice;
    }
  }
  confirm() {
    this.exchangeService.sellStock(this.data.employeeId,
      this.data.ticker, this.data.amount, this.data.limitValue, this.data.stopValue, this.data.aon, this.data.margin).subscribe(
      (response) => {
        this.openSuccessSnackBar("Uspešna prodaja.");
        this.dialog.close();
        this.router.navigate(['my-listings']);
      },
      (error) => {
        console.error('Nemate dovoljno sredstava:', error);
        this.openSuccessSnackBar("Neuspešna prodaja.");
        this.dialog.close();
        this.router.navigate(['my-listings']);
      },
    )

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
