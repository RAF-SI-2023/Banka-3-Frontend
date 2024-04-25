import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExchangeService} from "../../../services/exchange.service";
import {Forex, Future, Stock} from "../../../models/models";

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit{
  stocksFlag: boolean = true
  futuresFlag: boolean = false
  forexFlag: boolean = false

  stocks: Stock[] = [];
  futures: Future[] = [];
  forex: Forex[] = [];
  stockColumns: string[] = [ "ticker" ,"name", "exchange", "lastRefresh", "price", "ask","bid", "change", "volume", "opcije"]
  futureColumns: string[] = [ "contractName" ,"contractSize", "contractUnit", "maintenanceMargin", "type", "opcije"]
  forexColumns: string[] = [ "baseCurrency" ,"quoteCurrency", "conversionRate", "lastRefresh"]


  constructor(private exchangeService: ExchangeService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }
  switchToStocks(){
    if(this.stocksFlag) return;
    this.stocksFlag = true;
    this.futuresFlag = false;
    this.forexFlag = false;
    console.log(this.stocksFlag, this.futuresFlag, this.forexFlag)
    this.exchangeService.getAllStocks().subscribe( res => {
      this.stocks = res;
    }, error => {
      console.log(error)
    })
  }
  switchToFutures(){
    if(this.futuresFlag) return;
    this.futuresFlag = true;
    this.stocksFlag = false;
    this.forexFlag = false;
    console.log(this.stocksFlag, this.futuresFlag, this.forexFlag)
    this.exchangeService.getAllFutures().subscribe( res => {
       this.futures = res;
     }, error => {
       console.log(error)
     })
  }

  switchToForex() {
    if (this.forexFlag) return;
    this.forexFlag = true;
    this.stocksFlag = false;
    this.futuresFlag = false;
    console.log(this.stocksFlag, this.futuresFlag, this.forexFlag);
    this.exchangeService.getAllForex().subscribe(
        res => {
            this.forex = res;
        },
        error => {
            console.log(error);
        }
    );
}


  tickerInfo(ticker: string){
    this.router.navigate(['stock-info', ticker])
  }

  buy(ticker: string){
    this.router.navigate(['buy-hartije', ticker]);
  }
  buyFuture(id: number){

    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.exchangeService.buyFuture(id, tk.id).subscribe(res => {
      console.log(res)
      this.openErrorSnackBar("Uspesno ste kupili future!")

    }, error => {
      this.openErrorSnackBar("Doslo je do greske kod kupovanja future-a!")
      console.log(error)
    })
    // this.dialog.open(BuyFuturePopupComponent, {
    //   data: { selectedFutureId: id}
    // });
  }

  sell(stock: Stock){
  this.router.navigate(['options', stock]);

  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
  ngOnInit(){
    this.exchangeService.getAllStocks().subscribe( res => {
      this.stocks = res;
    }, error => {

    })
    this.stocks = [
      {
        "stockId": 1,
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 150.25,
        "ask": 150.50,
        "bid": 150.00,
        "change": 1.25,
        "volume": 1000000
      },
      {
        "stockId": 2,
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 300.75,
        "ask": 301.00,
        "bid": 300.50,
        "change": -0.25,
        "volume": 800000
      },
      {
        "stockId": 3,
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 2800.50,
        "ask": 2801.00,
        "bid": 2800.00,
        "change": 10.75,
        "volume": 500000
      },
      {
        "stockId": 4,
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 3300.25,
        "ask": 3300.50,
        "bid": 3300.00,
        "change": -5.75,
        "volume": 700000
      },
      {
        "stockId": 5,
        "ticker": "FB",
        "name": "Meta Platforms Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 340.75,
        "ask": 341.00,
        "bid": 340.50,
        "change": 2.50,
        "volume": 600000
      },
      {
        "stockId": 6,
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 900.00,
        "ask": 900.25,
        "bid": 899.75,
        "change": -1.25,
        "volume": 900000
      },
      {
        "stockId": 7,
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 600.50,
        "ask": 601.00,
        "bid": 600.00,
        "change": 5.25,
        "volume": 400000
      },
      {
        "stockId": 8,
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 550.25,
        "ask": 550.50,
        "bid": 550.00,
        "change": 3.75,
        "volume": 300000
      },
      {
        "stockId": 9,
        "ticker": "PYPL",
        "name": "PayPal Holdings Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 250.75,
        "ask": 251.00,
        "bid": 250.50,
        "change": 1.50,
        "volume": 200000
      },
      {
        "stockId": 10,
        "ticker": "AMD",
        "name": "Advanced Micro Devices Inc.",
        "exchange": "NASDAQ",
        "lastRefresh": 1671619200,
        "price": 100.25,
        "ask": 100.50,
        "bid": 100.00,
        "change": 0.75,
        "volume": 100000
      }
    ]
  }

}
