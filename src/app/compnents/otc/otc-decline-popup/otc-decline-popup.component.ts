import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExchangeService} from "../../../services/exchange.service";

@Component({
  selector: 'app-otc-decline-popup',
  templateUrl: './otc-decline-popup.component.html',
  styleUrls: ['./otc-decline-popup.component.css']
})
export class OtcDeclinePopupComponent {
  amount: number = 0;
  stock: string = '';
  price: number = 0;
  message: string = ''
  contractId: number = 0;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService
  ) {
    if (data) {
      this.stock = data.stock;
      this.contractId = data.contractId
    }
  }

  confirm() {
    //TODO Otkomentarisati kada se sklone mock podaci

    // this.exchangeService.companyDeclineContract(this.contractId, this.message).subscribe( data => {
    //   this.dialog.close();
    //   this.openSuccessSnackBar('Uspešno ste odbili ponudu.')
    // })
    this.dialog.close();
    this.openSuccessSnackBar('Uspešno ste odbili ponudu.')
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
