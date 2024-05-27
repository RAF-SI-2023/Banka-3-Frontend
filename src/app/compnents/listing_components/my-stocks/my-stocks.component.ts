import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BuyFuturePopupComponent} from "../sell-future-popup/buy-future-popup.component";
import {MyFuture, MyStock} from "../../../models/models";
import {ExchangeService} from "../../../services/exchange.service";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { SetStockVisibilityComponent } from '../set-stock-visibility/set-stock-visibility.component';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit, OnDestroy{

  myStocks = [] as MyStock[]
  myFutures = [] as MyFuture[]
  myStockColumns = ['myStockId', 'ticker', 'amount', 'opcije'];
  myFutureColumns = ['myFutureId', 'contractName', 'amount', 'opcije'];
  stocksFlag = true
  futuresFlag = false
  role: string = ''

  stockSubscription: Subscription | null = null

  constructor(private service: ExchangeService,  private webSocketService: WebsocketService, private router: Router, private dialog: MatDialog) {

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

  private tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
  ngOnInit(): void {
    if("role" in this.tk){
      this.role = this.tk.role
    }else{
      this.role = "ROLE_USER"
    }
    this.fetchStocks()

    this.service.getMyFutures().subscribe( res => {
      this.myFutures = res
    })
    this.stockSubscription = this.webSocketService.messages.subscribe( msg => {
      // this.service.getMyStocks().subscribe( res => {
      //   this.myStocks = res
      //   this.myStocks.sort((a, b) => a.myStockId - b.myStockId)
      // })
      this.fetchStocks()
    })

  }

  private fetchStocks(){
    if(this.role === "ROLE_USER"){
      this.service.getUserMyStocks(this.tk.id).subscribe(res => {
        this.myStocks = res
        this.myStocks.sort((a, b) => a.myStockId - b.myStockId)
      })
    }
    else if(this.role === "ROLE_COMPANY"){
      this.service.getCompanyMyStocks(this.tk.id).subscribe( res => {
        this.myStocks = res
        this.myStocks.sort((a, b) => a.myStockId - b.myStockId)
      })
    }
    else{
      this.service.getCompanyMyStocks(1).subscribe( res => {
        this.myStocks = res
        this.myStocks.sort((a, b) => a.myStockId - b.myStockId)
      })
    }
  }

  ngOnDestroy(): void {
      if (this.stockSubscription) {
        this.stockSubscription.unsubscribe();
      }
  }

  sellStock(ticker: string){
    this.router.navigate(['sell-hartije', ticker]);
  }
  //TODO sell future
  sellFuture(id: number){

    this.dialog.open(BuyFuturePopupComponent, {
      data: { selectedFutureId: id}
    });
  }
  setStockOtc(stock: any){
    this.dialog.open(SetStockVisibilityComponent, {
      data: { stock: stock}
    })
  }



}
