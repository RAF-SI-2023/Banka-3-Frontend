import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-buy-hartije-popup',
  templateUrl: './buy-hartije-popup.component.html',
  styleUrls: ['./buy-hartije-popup.component.css']
})
export class BuyHartijePopupComponent {

  selectedQuantity: number = 0;
  selectedOrderType: string = '';
  estimatedPrice: number = 0;

  constructor(private router: Router) { }

  confirm() {
    this.router.navigate(['listing-list']);
  }

  cancel() {
    this.router.navigate(['buy-hartije']);
  }
}

