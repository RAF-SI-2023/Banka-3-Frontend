import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ExchangeService} from "../../../services/exchange.service";

@Component({
  selector: 'app-buy-future-popup',
  templateUrl: './buy-future-popup.component.html',
  styleUrls: ['./buy-future-popup.component.css']
})
export class BuyFuturePopupComponent {

  selectedFutureId : number = 0
  estimatedPrice: number = 0;
  futureId: number = 0
  groupForm: FormGroup
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder
  ) {
    if(data){
      this.futureId = data.selectedFutureId
    }
    this.groupForm = this.formBuilder.group({
      amount: new FormControl('1', [Validators.required, Validators.min(1)]),
    })
  }
  confirm() {
    // let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    // this.exchangeService.sellFuture(this.futureId, tk.id, this.groupForm.get('amount')?.value).subscribe(
    //   (response) => {
    //     this.openSuccessSnackBar("Uspešna kupovina.");
    //     this.dialog.close();
    //     this.router.navigate(['listing-list'])
    //       .then(window.location.reload);
    //   },
    //   (error) => {
    //     console.error('Nemate dovoljno sredstava:', error);
    //     this.openSuccessSnackBar("Neuspešna kupovina.");
    //     this.dialog.close();
    //     this.router.navigate(['listing-list'])
    //     .then(window.location.reload);
    //   },
    // )

  }

  cancel() {
    this.dialog.close();
  }

  openSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }

  get amount() {
    return this.groupForm.get('amount');
  }
}
