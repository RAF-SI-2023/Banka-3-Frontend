import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupTransactionComponent} from "../popup/popup-transaction/popup-transaction.component";
import {Account} from "../models/models";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {

  // owner: string = 'Pera Peric';
  // type: string = '/';
  // accountStatus: string = '/';
  // reservedFunds: number = 0;
    account:any;
  constructor(private router: Router, private userService: UserService, private dialog: MatDialog) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.account = navigation.extras.state['account'];
    }
  }

  //todo AccountDto treba da se koristi za sad nije uradjen



 /* navigateToPayment() {
      const account=this.selectedAccount;
      this.router.navigate(['/payment'], { state: { account: account } });
  }*/
  navigateToPayment() {

    const account = this.selectedAccount;
      this.router.navigate(['/payment'], { state: { account: account }});
      //console.log(account);
  }


  navigateToPayingPage(){
    this.router.navigate(['/pay', this.account]);
  }

  ngOnInit(): void {

   this.selectedAccount = history.state.account;
    //console.log(this.selectedAccount); // This will log the passed selectedAccount
  }
  selectedAccount: any;
  goBack() {
    this.router.navigate(['/welcome']);
  }

  openDialog(){
    this.dialog.open(PopupTransactionComponent,{
      data: { inputValue: '' }
    });
  }

  async sendRequest() {
    try {
      const response = await this.userService.sendRequest();
      if (response.status === 200) {
        this.openDialog();
      } else if (response.status === 404) {
        alert('Korisnik ne postoji.');
      } else if (response.status === 403) {
        alert('Nema dovoljno stanja na računu.');
      } else {
        alert('Neočekivani odgovor od servera.');
      }
    } catch (error) {
      console.error('Greška prilikom slanja zahtjeva:', error);
    }
  }

}
