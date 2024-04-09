import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Account, Employee, Stock} from "../models/models";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {HttpHeaders} from "@angular/common/http";
import {ExchangeService} from "../services/exchange.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuyHartijePopupComponent } from '../buy-hartije-popup/buy-hartije-popup.component';

@Component({
  selector: 'app-buy-hartije',
  templateUrl: './buy-hartije.component.html',
  styleUrls: ['./buy-hartije.component.css']
})
export class BuyHartijeComponent implements OnInit{

  ticker: string = "";
  employeeId: number = 0;
  groupForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
     private router: Router, private route: ActivatedRoute,
      private exchangeService: ExchangeService) {
    this.groupForm = this.formBuilder.group({
      amount: new FormControl('1', [Validators.required, Validators.min(1)]),
      limit: new FormControl('0'),
      stop: new FormControl('0'),
      allOrNone: [false],
      margin: [false]
    })

  }

  buttonCancel(){
    this.router.navigate(['listing-list']);
  }
  buttonBuy() {

    if (this.groupForm.valid) {
      const amount = this.groupForm.get('amount')?.value;
      const limit = this.groupForm.get('limit')?.value;
      const stop = this.groupForm.get('stop')?.value;
      const allOrNone = this.groupForm.get('allOrNone')?.value;
      const margin = this.groupForm.get('margin')?.value;

      let orderType = '';

      if (stop && limit && limit!=0 && stop!=0) {
        orderType = "Stop-Limit";
      } else if (stop && stop!=0 && margin) {
        orderType = "Margin Stop";
      } else if (limit && limit!=0) {
        orderType = "Limit";
      } else if (stop && stop!=0) {
        orderType = "Stop";
      } else {
        orderType = "Market";
      }

      let orderDetails = orderType;

      if (allOrNone) {
        orderDetails += " All or None";
      }

      if (margin) {
        orderDetails += " Margin";
      }

      orderDetails += " order"

      let amountLet = amount;

        
      // Open dialog and pass order details
      this.dialog.open(BuyHartijePopupComponent, {
        data: { selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: 10, employeeId: this.employeeId, 
          ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
      });
  
    }
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const ticker = params['ticker'];
      this.ticker = ticker;
    });
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.employeeId = tk.id;
  }

  get amount() {
    return this.groupForm.get('amount');
  }
  

}
