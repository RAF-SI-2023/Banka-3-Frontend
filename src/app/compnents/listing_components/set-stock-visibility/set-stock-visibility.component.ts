import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyStock } from 'src/app/models/models';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-set-stock-visibility',
  templateUrl: './set-stock-visibility.component.html',
  styleUrls: ['./set-stock-visibility.component.css']
})
export class SetStockVisibilityComponent {

    stock = {} as MyStock
    amount : number = 0
    publicAmount = 0
    privateAmount = 0
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>, private exchangeService: ExchangeService){
      if(data && data.stock){
        this.stock = data.stock
      }
      this.amount = data.stock.amount
      //MOCK
      // this.amount = 10
    }
    cancel(){
      this.dialog.close()
    }
    //TODO treba ruta na backu da se uradi
    confirm(){
      // this.exchangeService.setStockView().subscribe( res => {
      //   console.log(res)
      //
      // }, error => {
      //   console.log(error)
      // })
    }

    changeAmountPublic(value: number){
      this.privateAmount = this.amount - value

    }
    changeAmountPrivate(value: number){
      this.publicAmount = this.amount - value

    }

}
