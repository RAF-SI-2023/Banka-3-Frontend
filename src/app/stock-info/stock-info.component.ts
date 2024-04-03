import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import { Daily, Intraday, Monthly, Weekly } from '../models/models';
import { AgAreaSeriesOptions} from "ag-charts-community";
import {  getDailyMockData, getIntradayMockData } from './mock-data';


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


  constructor(private router: Router, private route: ActivatedRoute, private service: ExchangeService) {
    this.selectedButton = '1d';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const ticker = params['ticker'];
      this.ticker = ticker;

      if(ticker){
        this.selectButton("1d");
      }
    });
  }

  selectButton(buttonId: string) {
    this.selectedButton = buttonId;
    switch (buttonId) {
      case '1d':
        // this.getIntraday(this.ticker);
        // this.updateChart(this.formatDataIntraday(this.intradayList));
        this.updateChart(this.formatDataIntraday(getIntradayMockData().slice(0,12)));
        break;
      case '1w':
        // this.getDaily(this.ticker);
        // const slicedData = this.dailyList.slice(0, 7);
        // this.updateChart(this.formatData(slicedData));
        this.updateChart(this.formatData(getDailyMockData().slice(0,7)));
        break;
      case '1m':
        this.getWeekly(this.ticker);
        const slicedData2 = this.weeklyList.slice(0, 4);
        this.updateChart(this.formatData(slicedData2));
        break;
      case '1y':
        this.getMonthly(this.ticker);
        const slicedData3 = this.monthlyList.slice(0, 12);
        this.updateChart(this.formatData(slicedData3));
        break;
      case '5y':
        this.getMonthly(this.ticker);
        const slicedData4 = this.monthlyList.slice(0, 60);
        this.updateChart(this.formatData(slicedData4));
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
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  getDaily(ticker: string){
    this.service.getDaily(ticker)
      .subscribe(response => {
        this.dailyList = response;
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  getWeekly(ticker: string){
    this.service.getWeekly(ticker)
      .subscribe(response => {
        this.weeklyList = response;
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  getMonthly(ticker: string){
    this.service.getMonthly(ticker)
      .subscribe(response => {
        this.monthlyList = response;
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
  
}