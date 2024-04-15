import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Daily, Future, Intraday, Monthly, Options, Stock, Weekly, Forex, MyStock, MyFuture} from "../models/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  apiUrlExchangeService: string = "http://localhost:8083/api/v1"
  apiUrlOptions: string = "http://localhost:8083/api/v1/option"
  apiUrlStocks: string = "http://localhost:8083/api/v1/stock"
  apiUrlForex: string = "http://localhost:8083/api/v1/forex"
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
  getAllForex(): Observable<Forex[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Forex[]>(`${this.apiUrlForex}/getAll`, { headers });
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

  buyStock(employeeId: number, ticker:string, amount: number, limitValue:number, stopValue: number, aon: boolean, margine:boolean){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        })
        const body = {employeeId, ticker, amount, limitValue, stopValue, aon, margine};
        return this.httpClient.post<any>(`${this.apiUrlStocks}/buyStock`,body,{ headers })
      }

  getAllOrdersToApprove(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<any>(`${this.apiUrlExchangeService}/ordersToApprove/getAll`);
  }

  approveStockOrder(id:number, approved: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.put(`${this.apiUrlExchangeService}/ordersToApprove/approve/${id}`, approved, {headers});
  }
    // Metoda za restartovanje iskorišćenog limita za korisnika
    resetLimitUsed(id: number): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      return this.httpClient.post(`${this.apiUrlExchangeService}/actuary/restartLimitUsed/${id}`, { headers });
    }

    // Metoda za postavljanje novog limita za korisnika
    setLimit(id: number, limit: number): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });


      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/actuary/setLimit/${id}`,limit, { headers });
    }
    getMyStocks(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });


      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/myStock/getAll`, { headers });
    }
    getMyFutures(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });


      return this.httpClient.get<MyFuture[]>(`${this.apiUrlExchangeService}/myFuture/getAll`, { headers });
    }

}





