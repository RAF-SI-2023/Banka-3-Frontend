import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ExchangeService} from "../../../services/exchange.service";
import { WebsocketService } from 'src/app/services/websocket.service';
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Forex } from 'src/app/models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-forex-popup',
  templateUrl: './buy-forex-popup.component.html',
  styleUrls: ['./buy-forex-popup.component.css']
})
export class BuyForexPopupComponent implements OnInit{

  forexId = 0
  companyId = 0
  amount = 0
  forex = {} as Forex
  // forexSubscription : Subscription | null = null

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService,
    private webSocketService: WebsocketService
) {
    if (data && data.forexId) {
      this.forexId = data.forexId;
      this.forex = data
    }
  }
  confirm() {
    this.exchangeService.buyForex(this.data.forexId, 1, this.amount).subscribe(
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

  validateAmount() {
      if (isNaN(this.amount)) {
        this.amount = 0;
      } else if (this.amount < 0) {
        this.amount = 0;
      }
  }
  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.companyId = tk.id;
    // this.forexSubscription = this.webSocketService.forexMessages.subscribe(res => {
    //   console.log(res)
    // })
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
