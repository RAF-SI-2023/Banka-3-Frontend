import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  
  owner: string = 'Pera Peric';
  accountNumber: string = '555-000432-534';
  availableBalance: number = 0;
  type: string = '/';
  accountStatus: string = '/';
  reservedFunds: number = 0;

  constructor(private router: Router) { }


  navigateToPayingPage(){
    this.router.navigate(['/pay', this.accountNumber]);
  }

}
