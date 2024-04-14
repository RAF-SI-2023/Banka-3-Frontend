import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import { Daily, Intraday, Monthly, Stock, Weekly } from '../models/models';
import { AgAreaSeriesOptions} from "ag-charts-community";


@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit{
  selectedButton: string; 
  exchangeActive: boolean = false;
  ticker:string = "";
  intradayList: Intraday[] | [] = [];
  dailyList: Daily[] | [] = [];
  weeklyList: Weekly[] | [] = [];
  monthlyList: Monthly[] | [] = [];
  chartOptions: any; 
  stock: Stock;

  constructor(private router: Router, private route: ActivatedRoute, private service: ExchangeService) {
    this.stock = {
      stockId: 1,
      name: 'Company Name',
      exchange: 'Stock Exchange',
      lastRefresh: Date.now(), 
      ticker: 'TICK',
      price: 100.00,
      ask: 101.00,
      bid: 99.00,
      change: 1.00,
      volume: 1000
    };

    this.selectedButton = '1d';
    this.chartOptions = {
      data: [], 
      series: [] 
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const ticker = params['ticker'];
      this.ticker = ticker;

      if(ticker){
        this.selectButton("1d");
      }
    });

    this.service.getByTicker(this.ticker)
      .subscribe(response => {
        this.stock = response;
        console.log(this.stock);
      }, error => {
        console.error('Error occurred:', error);
      });

  }

  selectButton(buttonId: string) {
    this.selectedButton = buttonId;
    switch (buttonId) {
      case '1d':
        this.getIntraday(this.ticker);
        break;
      case '1w':
        this.getDaily(this.ticker);
        break;
      case '1m':
        this.getWeekly(this.ticker);
        break;
      case '1y':
        this.getMonthly(this.ticker, 12);
        break;
      case '5y':
        this.getMonthly(this.ticker, 60);
        break;
      default:
        break;
    }
  }

  updateChart(list: any[]) {
    this.chartOptions = {
      data: list,
      series: [
        {
          type: "area",
          xKey: "formattedDate",
          yKey: "price",
          yName: "Price",
        } as AgAreaSeriesOptions,
      ],
    };
  }


  formatData(data: any[]): any[] {
    return data.map(item => {
      return {
        date: item.date,
        price: item.price,
        ticker: item.ticker,
        formattedDate: this.formatDate(item.date) 
      };
    });
  }

  formatDataIntraday(data: any[]): any[] {
    return data.map(item => {
      return {
        date: item.date,
        price: item.price,
        ticker: item.ticker,
        formattedDate: this.formatTime(item.date) 
      };
    });
  }

  getIntraday(ticker: string){
    this.service.getIntraday(ticker)
      .subscribe(response => {
        this.intradayList = this.formatData(response);
        this.updateChart(this.formatDataIntraday(this.intradayList.slice(0,12)));
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  getDaily(ticker: string){
    this.service.getDaily(ticker)
      .subscribe(response => {
        this.dailyList = response;
        const slicedData = this.dailyList.slice(0, 7);
        this.updateChart(this.formatData(slicedData));
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  getWeekly(ticker: string){
    this.service.getWeekly(ticker)
      .subscribe(response => {
        this.weeklyList = response;
        const slicedData2 = this.weeklyList.slice(0, 4);
        this.updateChart(this.formatData(slicedData2));
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  getMonthly(ticker: string, num: number){
    this.service.getMonthly(ticker)
      .subscribe(response => {
        this.monthlyList = response;
         const slicedData3 = this.monthlyList.slice(0, num);
        this.updateChart(this.formatData(slicedData3));
      }, error => {
        console.error('Error occurred:', error);
      });
  }


  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // Example output: "2:30:45"
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Example output: "4/3/2024" 
  }

  goBack(): void {
    this.router.navigate(['/listing-list']); 
  }

  goToOptions(): void {
    this.router.navigate(['/options', this.ticker]); 
  }
  
}