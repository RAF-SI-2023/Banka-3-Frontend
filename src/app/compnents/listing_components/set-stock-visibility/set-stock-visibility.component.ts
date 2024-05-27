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
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>, private exchangeService: ExchangeService){
      if(data && data.stock){
        this.stock = data.stock
      }
      this.amount = data.stock.amount

    }
    cancel(){
      this.dialog.close()
    }

    confirm(){
      const token = sessionStorage.getItem('token');
      const payload = JSON.parse(atob(token!.split('.')[1]));
      const hasRole = "role" in payload;
      if(!hasRole){
        this.exchangeService.setStockViewUser(this.stock.ticker, this.stock.userId, this.publicAmount).subscribe( res => {
          console.log(res)
          this.dialog.close()

        }, error => {
          console.log(error)
        })
      }
      else if(payload.role === "ROLE_COMPANY"){
        this.exchangeService.setStockViewCompany(this.stock.ticker, this.stock.companyId, this.publicAmount).subscribe( res => {
          this.dialog.close()
          console.log(res)

        }, error => {
          console.log(error)
        })
      }
      else{
        this.exchangeService.setStockViewCompany(this.stock.ticker, 1, this.publicAmount).subscribe( res => {
          this.dialog.close()
          console.log(res)

        }, error => {
          console.log(error)
        })
      }
    }

}
