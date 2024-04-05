import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Account, Employee, Stock} from "../models/models";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {HttpHeaders} from "@angular/common/http";
import {ExchangeService} from "../services/exchange.service";

@Component({
  selector: 'app-buy-hartije',
  templateUrl: './buy-hartije.component.html',
  styleUrls: ['./buy-hartije.component.css']
})
export class BuyHartijeComponent implements OnInit{

  ticker: string = "";
  employeeId: number = 0;
  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  aon: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private exchangeService: ExchangeService) {

  }

  buttonCancel(){
    this.router.navigate(['listing-list']);
  }
  buttonBuy() {
    this.router.navigate(['buy-hartije-popup']);

    this.exchangeService.buyStock(this.employeeId, this.ticker, this.amount, this.limitValue, this.stopValue, this.aon)

  }
  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.employeeId = tk.id;

    this.route.paramMap.subscribe(params => {
      this.ticker = String(params.get('ticker'));
      console.log(this.ticker);
    })
  }

}
