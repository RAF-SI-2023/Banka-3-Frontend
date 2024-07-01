import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import { MyStock } from 'src/app/models/models';
import { AccountService } from 'src/app/services/account.service';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-add-withdraw-margin-account',
  templateUrl: './add-withdraw-margin-account.component.html',
  styleUrls: ['./add-withdraw-margin-account.component.css']
})
export class AddWithdrawMarginAccountComponent {
  amount: number = 0;
  dataMargin = ''
  price: number = 0;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private bankService: AccountService
) {
  console.log(data)
    if (data) {
      this.dataMargin = data
    }
  }

  confirm() {

    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    const hasRole = "role" in payload
    if(hasRole && payload.role === 'ROLE_COMPANY'){
      if(this.dataMargin === 'Uplata'){
        this.bankService.addToMarginAccount(this.amount, payload.id, 'COMPANY').subscribe(res => {
          this.openSuccessSnackBar("Uspešno ste uplatili pare na račun.")
          console.log(res)
          this.dialog.close()

        }, err => {
          this.openSuccessSnackBar("Došlo je do greške.")
          console.log(err)
          this.dialog.close()
        })
      }else{
        this.bankService.withdrawFromMarginAccount(this.amount, payload.id, 'COMPANY').subscribe(res => {
          this.openSuccessSnackBar("Uspešno ste skinuli pare sa račun.")
          console.log(res)
          this.dialog.close()
        }, err => {
          this.openSuccessSnackBar("Došlo je do greške.")
          console.log(err)
          this.dialog.close()
        })
      }
    }else{
      if(this.dataMargin === 'Uplata'){
        this.bankService.addToMarginAccount(this.amount, payload.id, 'USER').subscribe(res => {
          this.openSuccessSnackBar("Uspešno ste uplatili pare na račun.")
          console.log(res)
          this.dialog.close()
        }, err => {
          this.openSuccessSnackBar("Došlo je do greške.")
          console.log(err)
          this.dialog.close()
        })
      }else{
        this.bankService.withdrawFromMarginAccount(this.amount, payload.id, 'USER').subscribe(res => {
          this.openSuccessSnackBar("Uspešno ste skinuli pare sa račun.")
          console.log(res)
          this.dialog.close()
        }, err => {
          this.openSuccessSnackBar("Došlo je do greške.")
          console.log(err)
          this.dialog.close()
        })

      }
    }


  }

  validateAmount() {
      if (isNaN(this.amount)) {
        this.amount = 0;
      } else if (this.amount < 0) {
        this.amount = 0;
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
