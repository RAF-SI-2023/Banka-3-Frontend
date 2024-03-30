import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Importovanje Router servisa



@Component({
  selector: 'app-popup-transaction',
  templateUrl: './popup-transaction.component.html',
  styleUrls: ['./popup-transaction.component.css']
})
export class PopupTransactionComponent {
  code : number | undefined;
  

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}


  closePopup() {

    this.accountService.confirmTransaction(this.data.inputValue, this.data.code).subscribe(
      response => {
        console.log("Odgovor servera:", response);
        this.openSuccessSnackBar();
        this.dialog.close();
        this.router.navigate(['/']); 
      },
      error => {
        console.error("Greška pri potvrđivanju transakcije:", error);
        this.openErrorSnackBar();
        this.dialog.close();
      }
    );    
  
  }

  openSuccessSnackBar() {
    this.snackBar.open('Transakcija uspešna', 'Zatvori', {
      duration: 2000, 
    });
  }
  
  openErrorSnackBar() {
    this.snackBar.open('Transakcija neuspešna', 'Zatvori', {
      duration: 0, 
    });
  }
}
