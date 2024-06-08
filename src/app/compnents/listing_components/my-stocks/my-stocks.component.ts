import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BuyFuturePopupComponent} from "../sell-future-popup/buy-future-popup.component";
import {Firm, MyForex, MyFuture, MyStock} from "../../../models/models";
import {ExchangeService} from "../../../services/exchange.service";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { SetStockVisibilityComponent } from '../set-stock-visibility/set-stock-visibility.component';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit, OnDestroy{

  myStocks = [] as MyStock[]
  myFutures = [] as MyFuture[]
  myForex = [] as MyForex[]
  myStockColumns = ['myStockId', 'ticker', 'amount', 'publicAmount', 'opcije'];
  myFutureColumns = ['myFutureId', 'contractName', 'amount', 'opcije'];
  myForexColumns = ['myForexId', 'companyId', 'amount', 'quoteCurrency', 'conversionRate', 'opcije'];
  stocksFlag = true
  futuresFlag = false
  forexFlag = false
  role: string = ''
  companies: { [firmId: number]: Firm | undefined } = {};

  stockSubscription: Subscription | null = null
  futureSubscription: Subscription | null = null
  forexSubscription: Subscription | null = null

  constructor(private service: ExchangeService, private userService: UserService,  private webSocketService: WebsocketService, private router: Router, private dialog: MatDialog) {

  }

  switchToStocks(){
    if(this.stocksFlag) return;
    this.stocksFlag = true
    this.futuresFlag = false
    this.forexFlag = false
    this.fetchStocks()

  }
  switchToFutures(){
    if(this.futuresFlag) return;
    this.futuresFlag = true
    this.stocksFlag = false
    this.forexFlag = false
    // this.service.getMyFutures().subscribe( res => {
    //   this.myFutures = res
    // })
  }
  switchToForex(){
    if(this.forexFlag) return;
    this.forexFlag = true
    this.stocksFlag = false
    this.futuresFlag = false
    //TODO getAllForex
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
      this.fetchStocks()
    })
    this.futureSubscription = this.webSocketService.futureMessages.subscribe( msg => {
      this.fetchFutures()
    })
    this.forexSubscription = this.webSocketService.forexMessages.subscribe( msg => {
      this.fetchForex()
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

  private fetchForex(){
    if(this.role === "ROLE_COMPANY"){
      this.service.getCompanyMyForex(this.tk.id).subscribe(res => {
        this.myForex = res
      })
    }else{
      this.service.getCompanyMyForex(1).subscribe(res => {
        this.myForex = res
      })
    }
  }

  private fetchFutures(){

  }


  fetchCompany(companyId: number){
      if (!this.companies[companyId]) {
        this.userService.getCompanyById(companyId).subscribe(res => {
          this.companies[companyId] = res;
        });
    }}

  ngOnDestroy(): void {
      if (this.stockSubscription) {
        this.stockSubscription.unsubscribe();
      }
      if (this.futureSubscription) {
        this.futureSubscription.unsubscribe();
      }
      if (this.forexSubscription) {
        this.forexSubscription.unsubscribe();
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
