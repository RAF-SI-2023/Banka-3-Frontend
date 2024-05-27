import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExchangeService } from 'src/app/services/exchange.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-otc-accept-decline',
  templateUrl: './otc-accept-decline.component.html',
  styleUrls: ['./otc-accept-decline.component.css']
})
export class OtcAcceptDeclineComponent {

  selectedQuantity: number = 0;
  selectedOrderType: string = '';
  estimatedPrice: number = 0;
  dataObj: any
  comment: string = '';

  constructor(
    private router: Router
    ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService,
    private webSocketService: WebsocketService
) {
    if (data && data.data) {
      this.dataObj = data.data
    }
  }
  confirm() {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    if(tk.role === "ROLE_SUPERVISOR" || tk.role === "ROLE_ADMIN"){
      this.exchangeService.acceptOrDeclineOfferSupervisor(this.dataObj.contractId, this.dataObj.accept, this.comment).subscribe(
        (response) => {
          this.openSuccessSnackBar("Uspešno ste prihvatili.");
          this.dialog.close();
          console.log(response)
          this.router.navigate(['supervisor-lising'])
        },
        (error) => {
          console.error('Greska:', error);
          this.openSuccessSnackBar("Neuspešna kupovina.");
          this.dialog.close();
          this.router.navigate(['supervisor-lising'])
        },
      )

    }else{

      this.exchangeService.acceptOrDeclineOffer(this.dataObj.contractId, this.dataObj.accept, this.comment).subscribe(
        (response) => {
          this.openSuccessSnackBar("Uspešno ste prihvatili.");
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
