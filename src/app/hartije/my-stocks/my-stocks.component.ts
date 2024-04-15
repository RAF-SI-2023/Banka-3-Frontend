import {Component, OnInit} from '@angular/core';
import {ExchangeService} from "../../services/exchange.service";
import {MyFuture, MyStock} from "../../models/models";

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit{

  myStocks = [] as MyStock[]
  myFutures = [] as MyFuture[]
  myStockColumns = ['myStockId', 'ticker', 'amount'];
  myFutureColumns = ['myFutureId', 'contractName', 'amount'];
  stocksFlag = true
  futuresFlag = false
  constructor(private service: ExchangeService) {

  }

  switchToStocks(){
    if(this.stocksFlag) return;
    this.stocksFlag = true
    this.futuresFlag = false
    this.service.getMyStocks().subscribe( res => {
      this.myStocks = res
    })

  }
  switchToFutures(){
    if(this.futuresFlag) return;
    this.futuresFlag = true
    this.stocksFlag = false
    this.service.getMyFutures().subscribe( res => {
      this.myFutures = res
    })
  }

  ngOnInit(): void {
    this.service.getMyStocks().subscribe( res => {
      this.myStocks = res
    })
    this.service.getMyFutures().subscribe( res => {
      this.myFutures = res
    })
  }



}
