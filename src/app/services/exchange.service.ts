import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Daily, Future, Intraday, Monthly, Options, Stock, Weekly} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  apiUrlExchangeService: string = "http://localhost:8083/api/v1"
  apiUrlOptions: string = "http://localhost:8083/api/v1/option"
  apiUrlStocks: string = "http://localhost:8083/api/v1/stock"
  constructor(private httpClient : HttpClient) { }

  getAllStocks(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Stock[]>(`${this.apiUrlExchangeService}/stock`,{headers} )
  }
  getAllFutures(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Future[]>(`${this.apiUrlExchangeService}/future/getAll`,{headers} )
  }
  getAllOptions(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Future[]>(`${this.apiUrlExchangeService}/options/getAll`,{headers} )
  }

  getIntraday(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Intraday[]>(`${this.apiUrlExchangeService}/history/intraday/${ticker}`,{headers} )
  }

  getDaily(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Daily[]>(`${this.apiUrlExchangeService}/history/daily/${ticker}`,{headers} )
  }

  getWeekly(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Weekly[]>(`${this.apiUrlExchangeService}/history/weekly/${ticker}`,{headers} )
  }

  getMonthly(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Monthly[]>(`${this.apiUrlExchangeService}/history/monthly/${ticker}`,{headers} )
  }

  getByTicker(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Stock>(`${this.apiUrlExchangeService}/stock/${ticker}`,{headers} )
  }
  getAllCalls(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Options[]>(`${this.apiUrlOptions}/calls/${ticker}`,{headers} )
  }
  getAllPuts(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Options[]>(`${this.apiUrlOptions}/puts/${ticker}`,{headers} )
  }
  buyStock(employeeId: number, ticker:string, amount: number, limitValue:number, stopValue: number, aon: boolean){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        })
        const body = {employeeId, ticker, amount, limitValue, stopValue, aon};
        return this.httpClient.post<any>(`${this.apiUrlStocks}/buyStock`,body,{ headers })
      }
}
