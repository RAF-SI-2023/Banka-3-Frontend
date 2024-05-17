import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ExchangeService} from "../../../services/exchange.service";
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-buy-hartije-popup',
  templateUrl: './buy-hartije-popup.component.html',
  styleUrls: ['./buy-hartije-popup.component.css']
})
export class BuyHartijePopupComponent {

  selectedQuantity: number = 0;
  selectedOrderType: string = '';
  estimatedPrice: number = 0;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService,
    private webSocketService: WebsocketService
) {
    if (data && data.selectedOrderType && data.selectedQuantity && data.estimatedPrice) {
      this.selectedOrderType = data.selectedOrderType;
      this.selectedQuantity = data.selectedQuantity;
      this.estimatedPrice = data.estimatedPrice;
    }
  }
  confirm() {
    this.exchangeService.buyStock(this.data.employeeId,
      this.data.ticker, this.data.amount, this.data.limitValue, this.data.stopValue, this.data.aon, this.data.margin).subscribe(
      (response) => {
        this.openSuccessSnackBar("Uspešna kupovina.");
        this.dialog.close();
        console.log(response)
        this.router.navigate(['listing-list'])
      },
      (error) => {
        console.error('Nemate dovoljno sredstava:', error);
        this.openSuccessSnackBar("Neuspešna kupovina.");
        this.dialog.close();
        this.router.navigate(['listing-list']);
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

