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

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    if("role" in tk){
      this.role = tk.role
    }else{
      this.role = "ROLE_USER"
    }
    this.service.getMyStocks().subscribe( res => {
      this.myStocks = res
      this.myStocks.sort((a, b) => a.myStockId - b.myStockId)
    })

    this.service.getMyFutures().subscribe( res => {
      this.myFutures = res
    })
    this.stockSubscription = this.webSocketService.messages.subscribe( msg => {
      this.service.getMyStocks().subscribe( res => {
        this.myStocks = res
        this.myStocks.sort((a, b) => a.myStockId - b.myStockId)
      })
    })

    // this.stockSubscription = this.webSocketService.getStockUpdates().subscribe(
    //   (stockUpdate) => {
    //     this.updateStockList(stockUpdate);
    //   },
    //   (err) => console.error('Error receiving stock updates', err),
    //   () => console.log('Stock updates complete')
    // );

  }

  ngOnDestroy(): void {
      if (this.stockSubscription) {
        this.stockSubscription.unsubscribe();
      }
  }



  private updateStockList(stockUpdate: MyStock): void {
    const existingStock = this.myStocks.find(stock => stock.myStockId === stockUpdate.myStockId);
    if (existingStock) {
      existingStock.amount = stockUpdate.amount
      Object.assign(existingStock, stockUpdate);
      this.myStocks.push(existingStock)
    } else {
      this.myStocks.push(stockUpdate);
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
