import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-popup-transaction',
  templateUrl: './popup-transaction.component.html',
  styleUrls: ['./popup-transaction.component.css']
})
export class PopupTransactionComponent {
  code : number | undefined;
  constructor(private dialog: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private userService : UserService, private accountService: AccountService) {}
  closePopup() {
    // uhvatimo kod koji je poslat od strane back-a
    this.accountService.confirmTransaction(this.data.inputValue, this.code).subscribe(res => {
      console.log(res)
    })
    /* proverimo da li je kod sa back-a i uneti kod isti ako jeste treba da se odradi prolazak transakcije na neku putanju,
     ako nije izlazi nije ispravna sifra */
    // if(this.code === this.data){
    //   // logika za prolazak transakcije..
    //
    // }else{
    //   alert("Nije ispravna sifra");
    // }
  }
}
