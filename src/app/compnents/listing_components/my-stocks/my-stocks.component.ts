import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BuyFuturePopupComponent} from "../sell-future-popup/buy-future-popup.component";
import {Firm, MyForex, MyFuture, MyOptions, MyStock} from "../../../models/models";
import {ExchangeService} from "../../../services/exchange.service";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { SetStockVisibilityComponent } from '../set-stock-visibility/set-stock-visibility.component';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit, OnDestroy{

  myStocks = [] as MyStock[]
  myFutures = [] as MyFuture[]
  myForex = [] as MyForex[]
  myOptions = [] as MyOptions[]
  myStockColumns = ['myStockId', 'ticker', 'amount', 'publicAmount', 'opcije'];
  myFutureColumns = ['myFutureId', 'contractName', 'contractSize','contractUnit','price', 'opcije'];
  myForexColumns = ['myForexId', 'companyId', 'amount', 'quoteCurrency'];
  myOptionColumns = ['myOptionId', 'companyId','contractSymbol', 'optionType', 'ask', 'bid', 'price', 'quantity', 'opcije'];
  stocksFlag = true
  futuresFlag = false
  forexFlag = false
  optionsFlag = false
  role: string = ''
  id = 0
  companies: { [firmId: number]: Firm | undefined } = {};

  stockSubscription: Subscription | null = null
  futureSubscription: Subscription | null = null
  forexSubscription: Subscription | null = null
  optionsSubscription: Subscription | null = null

  constructor(private service: ExchangeService,
              private userService: UserService,
              private webSocketService: WebsocketService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {

  }

  switchToStocks(){
    if(this.stocksFlag) return;
    this.stocksFlag = true
    this.futuresFlag = false
    this.forexFlag = false
    this.optionsFlag = false
    this.fetchStocks()

  }
  switchToFutures(){
    if(this.futuresFlag) return;
    this.futuresFlag = true
    this.stocksFlag = false
    this.forexFlag = false
    this.optionsFlag = false
    // this.service.getMyFutures().subscribe( res => {
    //   this.myFutures = res
    // })
    this.fetchFutures()
  }
  switchToForex(){
    if(this.forexFlag) return;
    this.forexFlag = true
    this.stocksFlag = false
    this.futuresFlag = false
    this.optionsFlag = false
    this.fetchForex()
  }
  switchToOptions(){
    if(this.optionsFlag) return;
    this.optionsFlag = true
    this.stocksFlag = false
    this.forexFlag = false
    this.futuresFlag = false
    this.fetchOptions()
  }

  private tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
  ngOnInit(): void {
    if("role" in this.tk){
      this.role = this.tk.role
    }else{
      this.role = "ROLE_USER"
    }
    this.id = this.tk.id
    this.fetchStocks()

    // this.service.getMyFuturesForCompany(this.tk.id).subscribe( res => {
    //   this.myFutures = res
    // })
    this.stockSubscription = this.webSocketService.messages.subscribe( msg => {
      this.fetchStocks()
    })
    this.futureSubscription = this.webSocketService.futureMessages.subscribe( msg => {
      this.fetchFutures()
    })
    this.forexSubscription = this.webSocketService.forexMessages.subscribe( msg => {
      this.fetchForex()
    })
    this.optionsSubscription = this.webSocketService.optionsMessages.subscribe( msg => {
      this.fetchOptions()
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
  private fetchOptions(){
    this.service.getCompanyMyOptions(this.tk.id).subscribe(res => {
      this.myOptions = res
    })
  }

  private fetchFutures(){

    if(this.role === "ROLE_COMPANY"){
      this.service.getMyFuturesForCompany(this.tk.id).subscribe( res => {
        this.myFutures = res
      })
    }else{
      this.service.getMyFuturesForCompany(1).subscribe( res => {
        this.myFutures = res
      })
    }
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
      if (this.optionsSubscription) {
        this.optionsSubscription.unsubscribe();
      }
  }

  sellStock(ticker: string){
    this.router.navigate(['sell-hartije', ticker]);
  }
  sellOption(option: MyOptions){
    if(this.tk.role === 'ROLE_COMPANY'){
      this.service.sellOption(this.tk.id, option.contractSymbol, option.optiontype, option.quantity).subscribe(res => {
        this.openSnackBar("Uspesno ste prodali option!")
      }, err => {
        this.openSnackBar("Doslo je do greske kod prodaje future!")
        console.error(err)
      })
    }else{
      this.service.sellOption(1, option.contractSymbol, option.optiontype, option.quantity).subscribe(res => {
        this.openSnackBar("Uspesno ste prodali option!")
      }, err => {
        this.openSnackBar("Doslo je do greske kod option future!")
        console.error(err)
      })
    }
  }

  sellForex(forex: MyForex){
    //TODO sellFOREX
  }
  sellFuture(id: number){

    if(this.tk.role === 'ROLE_COMPANY'){
      this.service.sellFuture(id, this.tk.id).subscribe(res => {
        this.openSnackBar("Uspesno ste prodali future!")
      }, err => {
        this.openSnackBar("Doslo je do greske kod prodaje future!")
        console.error(err)
      })
    }else{
      this.service.sellFuture(id, 1).subscribe(res => {
        this.openSnackBar("Uspesno ste prodali future!")
      }, err => {
        this.openSnackBar("Doslo je do greske kod prodaje future!")
        console.error(err)
      })
    }
  }
  setStockOtc(stock: any){
    this.dialog.open(SetStockVisibilityComponent, {
      data: { stock: stock}
    })
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }

}
