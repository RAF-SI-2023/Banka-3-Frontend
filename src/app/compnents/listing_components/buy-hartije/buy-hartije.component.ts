import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {HttpHeaders} from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuyHartijePopupComponent } from '../buy-hartije-popup/buy-hartije-popup.component';
import {ExchangeService} from "../../../services/exchange.service";
import { Stock } from 'src/app/models/models';

@Component({
  selector: 'app-buy-hartije',
  templateUrl: './buy-hartije.component.html',
  styleUrls: ['./buy-hartije.component.css']
})
export class BuyHartijeComponent implements OnInit{

  ticker: string = "";
  employeeId: number = 0;
  groupForm: FormGroup;
  stock = {} as Stock



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
      let estimatedPrice = amount*this.stock.ask;

      if (stop && limit && limit!=0 && stop!=0) {
        estimatedPrice = estimatedPrice*1;
        orderType = "Stop-Limit";
      } else if (stop && stop!=0 && margin) {
        orderType = "Margin Stop";
        estimatedPrice = estimatedPrice*1;
      } else if (limit && limit!=0) {
        orderType = "Limit";
        estimatedPrice = estimatedPrice*1;
      } else if (stop && stop!=0) {
        orderType = "Stop";
        estimatedPrice = estimatedPrice*1;
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



      const token = sessionStorage.getItem('token');
      const payload = JSON.parse(atob(token!.split('.')[1]));
      const hasRole = "role" in payload;

      //USER kad kupuje: companyId = null, employeeId = null, userId = userId
      //EMPLOYEE kad kupuje: companyId = 1, employeeId = employeeId, userId = null
      //COMPANY kad kupuje: companyId = companyId, employeeId = null, userId = null
      console.log(margin)

      if(hasRole){
        if(payload.role === "ROLE_COMPANY"){

          this.dialog.open(BuyHartijePopupComponent, {
            data: {userId: null, companyId: payload.id, selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: null,
              ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
          });

        }else{

          this.dialog.open(BuyHartijePopupComponent, {
            data: {userId: null, companyId: 1, selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: payload.id,
              ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
          });
        }

      }else{
        this.dialog.open(BuyHartijePopupComponent, {
          data: {userId: payload.id, companyId: null, selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: null,
            ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
        });
      }
      // Open dialog and pass order details


    }
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const ticker = params['ticker'];
      this.ticker = ticker;
    });
    this.exchangeService.getByTicker(this.ticker).subscribe(res => {
      this.stock = res
    })
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.employeeId = tk.id;
  }

  get amount() {
    return this.groupForm.get('amount');
  }


}
