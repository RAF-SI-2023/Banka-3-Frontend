import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ExchangeService} from "../../../services/exchange.service";
import { WebsocketService } from 'src/app/services/websocket.service';
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Options, Stock } from 'src/app/models/models';

@Component({
  selector: 'app-buy-option-popup',
  templateUrl: './buy-option-popup.component.html',
  styleUrls: ['./buy-option-popup.component.css']
})
export class BuyOptionPopupComponent implements OnInit{

  optionId = 0
  companyId = 0
  quantity = 0
  option = {} as Options
  // forexSubscription : Subscription | null = null

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService,
    private webSocketService: WebsocketService
) {
    if (data) {
      this.optionId = data.optionId;
      this.option = data
    }
      console.log(this.option)
  }
  confirm() {
    this.exchangeService.buyOption(this.companyId ,this.data.contractSymbol, this.data.optionType, this.quantity).subscribe(
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
      if (isNaN(this.quantity)) {
        this.quantity = 0;
      } else if (this.quantity < 0) {
        this.quantity = 0;
      }else if (this.quantity > this.option.openInterest) {
        this.quantity = 0;
      }

  }
  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    if(tk.role === "ROLE_COMPANY"){
      this.companyId = tk.id;
    }else{
      this.companyId = 1
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
