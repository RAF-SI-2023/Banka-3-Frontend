import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Future, Intraday, Stock} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  apiUrlExchangeService: string = "http://localhost:8083/api/v1/"
  constructor(private httpClient : HttpClient) { }

  getAllStocks(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Stock[]>(`${this.apiUrlExchangeService}/stock/getAll`,{headers} )
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
    return this.httpClient.get<Intraday[]>(`${this.apiUrlExchangeService}/history/daily/${ticker}`,{headers} )
  }

  getWeekly(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Intraday[]>(`${this.apiUrlExchangeService}/history/weekly/${ticker}`,{headers} )
  }

  getMonthly(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Intraday[]>(`${this.apiUrlExchangeService}/history/monthly/${ticker}`,{headers} )
  }
}
