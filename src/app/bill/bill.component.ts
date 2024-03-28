import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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

  account: any;
  //todo AccountDto treba da se koristi za sad nije uradjen

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.account = navigation.extras.state['account'];
    }
  }
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
}
