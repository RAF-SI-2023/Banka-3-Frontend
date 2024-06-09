import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {BuyHartijePopupComponent} from "../buy-hartije-popup/buy-hartije-popup.component";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {SellHartijePopupComponent} from "../sell-hartije-popup/sell-hartije-popup.component";
import {ExchangeService} from "../../../services/exchange.service";

@Component({
  selector: 'app-sell-hartije',
  templateUrl: './sell-hartije.component.html',
  styleUrls: ['./sell-hartije.component.css']
})
export class SellHartijeComponent implements OnInit{

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
  buttonSell() {

    if (this.groupForm.valid) {
      const amount = this.groupForm.get('amount')?.value;
      const limit = this.groupForm.get('limit')?.value;
      const stop = this.groupForm.get('stop')?.value;
      const allOrNone = this.groupForm.get('allOrNone')?.value;
      const margin = this.groupForm.get('margin')?.value;

      let orderType = '';
      let estimatedPrice = amount;

      if (stop && limit && limit!=0 && stop!=0) {
        estimatedPrice = estimatedPrice*limit;
        orderType = "Stop-Limit";
      } else if (stop && stop!=0 && margin) {
        orderType = "Margin Stop";
        estimatedPrice = estimatedPrice*stop;
      } else if (limit && limit!=0) {
        orderType = "Limit";
        estimatedPrice = estimatedPrice*limit;
      } else if (stop && stop!=0) {
        orderType = "Stop";
        estimatedPrice = estimatedPrice*stop;
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

      // Open dialog and pass order details
      // this.dialog.open(SellHartijePopupComponent, {
      //   data: { selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: this.employeeId,
      //     ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
      // });


      if(hasRole){
        if(payload.role === "ROLE_COMPANY"){

          this.dialog.open(SellHartijePopupComponent, {
            data: {userId: null, companyId: payload.id, selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: null,
              ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
          });

        }else{

          this.dialog.open(SellHartijePopupComponent, {
            data: {userId: null, companyId: 1, selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: payload.id,
              ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
          });
        }

      }else{
        this.dialog.open(SellHartijePopupComponent, {
          data: {userId: payload.id, companyId: null, selectedOrderType: orderDetails, selectedQuantity: amountLet, estimatedPrice: estimatedPrice, employeeId: null,
            ticker: this.ticker, amount: amount, limitValue: limit, stopValue: stop, aon: allOrNone, margin:margin}
        });
      }


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
