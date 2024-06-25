import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  Daily,
  Future,
  Intraday,
  Monthly,
  Options,
  Stock,
  Weekly,
  Forex,
  MyStock,
  MyFuture,
  RequestDto,
  Actuary,
  Contract,
  FutureContract,
  MyForex,
  MyOptions,
  BankStock,
  Offer,
  MyOffer
} from "../models/models";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  apiUrlExchangeService: string = environment.exchangeServiceUrl + "/api/v1"
  apiUrlOptions: string = environment.exchangeServiceUrl + "/api/v1/option"
  apiUrlStocks: string = environment.exchangeServiceUrl + "/api/v1/stock"
  apiUrlForex: string = environment.exchangeServiceUrl + "/api/v1/forex"
  apiAgentProfit: string = environment.exchangeServiceUrl + "/api/v1/actuary/profit"
  apiBankOtc: string = environment.exchangeServiceUrl + "/api/v1/otcTrade"

  constructor(private httpClient : HttpClient) { }

  getAllStocks(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    console.log(`${this.apiUrlExchangeService}/stock`)
    return this.httpClient.get<Stock[]>(`${this.apiUrlExchangeService}/stock`,{headers} )
  }
  getAllFutures(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Future[]>(`${this.apiUrlExchangeService}/future`,{headers} )
  }
  getAllForex(): Observable<Forex[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Forex[]>(`${this.apiUrlExchangeService}/forex`, { headers });
  }
  getCompanyMyForex(firmId: number): Observable<MyForex[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<MyForex[]>(`${this.apiUrlForex}/myForex/getAllForCompany/${firmId}`, { headers });
  }
  getCompanyMyOptions(companyId: number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<MyOptions[]>(`${this.apiUrlExchangeService}/option/getAllForCompany/${companyId}`,{headers} )
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

  setOrderRequest(id: number, orderRequest: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    // const body = { orderRequest };

    return this.httpClient.post<any>(`${this.apiUrlExchangeService}/actuary/setOrderRequest/${id}?orderRequest=${orderRequest}`, { headers });
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

  buyStock(userId: number, companyId: number, employeeId: number, ticker:string, amount: number,
           limitValue:number, stopValue: number, aon: boolean,
           margine:boolean){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const body = {userId, companyId, employeeId, ticker, amount, limitValue, stopValue, aon, margine};
    return this.httpClient.post<any>(`${this.apiUrlStocks}/buyStock`,body,{ headers })
  }
  buyOption(companyId: number, contractSymbol: string, optionType: string, quantity: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const body = {companyId, contractSymbol, optionType, quantity};
    return this.httpClient.post<any>(`${this.apiUrlOptions}/bankBuyOption`,body,{ headers })
  }
  sellOption(companyId: number, contractSymbol: string, optionType: string, quantity: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const body = {companyId, contractSymbol, optionType, quantity};
    return this.httpClient.post<any>(`${this.apiUrlStocks}/bankSellOption`,body,{ headers })
  }

  buyForex(forexId: number, companyId: number, amount: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const body = {forexId, companyId, amount};
    return this.httpClient.post<any>(`${this.apiUrlForex}/myForex/buyForex`,body,{ headers })
  }
  getAllOrdersToApprove(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<RequestDto[]>(`${this.apiUrlExchangeService}/stock/ordersToApprove/getAll`);
  }

  approveStockOrder(id:number, approved: boolean){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<RequestDto>(`${this.apiUrlExchangeService}/stock/ordersToApprove/approve/${id}?approved=${approved}`, {headers});
  }

  resetLimitUsed(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.httpClient.get<Actuary>(`${this.apiUrlExchangeService}/actuary/restartLimitUsed/${id}`, { headers });
  }

  getAllAgents(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.httpClient.get<Actuary[]>(`${this.apiUrlExchangeService}/actuary/getAll`, { headers });
  }

  setLimit(id: number, limit: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    console.log(id)
    console.log(limit)
    return this.httpClient.get<Actuary>(`${this.apiUrlExchangeService}/actuary/setLimit/${id}?limit=${limit}`, { headers });
  }

    getMyStocks(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAll`, { headers });
    }
    getMyFuturesForCompany(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });


      return this.httpClient.get<MyFuture[]>(`${this.apiUrlExchangeService}/future/myFuture/getAllForCompany/${companyId}`, { headers });
    }
    sellStock(userId: number,companyId: number, employeeId: number, ticker:string, amount: number, limitValue:number, stopValue: number, aon: boolean, margine:boolean){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      const body = {userId, companyId, employeeId, ticker, amount, limitValue, stopValue, aon, margine};
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/stock/sellStock`, body, { headers });
    }
    buyFuture(futureId: number, companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      const body = {futureId, companyId};
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/future/buyFuture`, body, { headers });
    }
    sellFuture(futureId: number, companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      const body = {futureId, companyId};
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/future/sellFuture`, body, { headers });
    }

    getAllSentContracts(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSent/${companyId}`, { headers });
    }
    getAllReceivedContracts(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllReceived/${companyId}`, { headers });
    }

    getAllContracts(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAll/${companyId}`, { headers });
    }

    getAllSupervisor(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSupervisor`, { headers });
    }

    companyAcceptContract(contractId: number, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { contractId, comment}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyAccept`, body, { headers });
    }
    companyDeclineContract(contractId: number, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { contractId, comment}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyDecline`, body, { headers });
    }

    buyCompanyStockOtc(sellerId: number, buyerId: number, ticker: string, amount: number, price: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { sellerId: sellerId, buyerId: buyerId, ticker: ticker, amount: amount, price: price}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/stock/buyCompanyStockOtc`, body, { headers });
    }

    buyUserStockOtc(sellerId: number, buyerId: number, ticker: string, amount: number, price: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { userSellerId: sellerId, userBuyerId: buyerId, ticker: ticker, amount: amount, price: price}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/stock/buyUserStockOtc`, body, { headers });
    }

    getPublicStocks(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForUserOtcBuy/${userId}`, { headers });
    }
    getCompanyPublicStocks(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForCompanyOtcBuy/${userId}`, { headers });
    }


    getUserMyStocks(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForUser?userId=${userId}`, { headers });
    }

    getCompanyMyStocks(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForCompany?companyId=${companyId}`, { headers });
    }

    getCompanyMyFutures(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyFuture[]>(`${this.apiUrlExchangeService}/stock/myFuture/getAllForCompany?companyId=${companyId}`, { headers });
    }


    getAllSentRequestsUser(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSentUser/${userId}`, { headers });
    }

    getAllSentRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSent/${companyId}`, { headers });
    }

    getAllSentFutureRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<FutureContract[]>(`${this.apiUrlExchangeService}/future-contract/getAllSent/${companyId}`, { headers });
    }

    getAllReceivedRequestsUser(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllReceivedUser/${userId}`, { headers });
    }

    getAllReceivedRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllReceived/${companyId}`, { headers });
    }

    getAllReceivedFutureRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<FutureContract[]>(`${this.apiUrlExchangeService}/future-contract/getAllReceived/${companyId}`, { headers });
    }

    setStockViewUser(ticker: string, userId: number, amount: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        ticker, ownerId: userId, amount
      }
      return this.httpClient.put<any>(`${this.apiUrlExchangeService}/stock/myStock/makeUserStockPublic`, data, { headers });
    }


    setStockViewCompany(ticker: string, userId: number, amount: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        ticker, ownerId: userId, amount
      }
      return this.httpClient.put<any>(`${this.apiUrlExchangeService}/stock/myStock/makeCompanyStockPublic`, data, { headers });
    }

    acceptOrDeclineOffer(contractId: number, accept: boolean, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        contractId, comment
      }
      if(accept){
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyAccept`, data, { headers });
      }
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyDecline`, data, { headers });
    }
    acceptOrDeclineOfferSupervisor(contractId: number, accept: boolean, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        contractId, comment
      }
      if(accept){
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/supervisorAccept`, data, { headers });
      }
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/supervisorDecline`, data, { headers });
    }
    getAgentProfits(): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<any>(`${this.apiAgentProfit}/getAll`, {headers});
    }
    getTaxes(): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<any>(`${this.apiUrlExchangeService}/tax`, {headers});
    }

    //TODO: PROMENA STOCKOVA TREBA

    getBankStocks(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<BankStock[]>(`${this.apiBankOtc}/getBanksStocks`, {headers});
    }
    getBankOffers(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Offer[]>(`${this.apiBankOtc}/getOffers`, {headers});
    }
    getMyBankOffers(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyOffer[]>(`${this.apiBankOtc}/getOurOffers`, {headers});
    }
    makeBankOffer(ticker: string, amount: number, price: number, owner: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      let body = {
        ticker, amount, price, owner
      }
      return this.httpClient.post<any>(`${this.apiBankOtc}/makeOffer`, body, {headers});
    }
    acceptBankffer(id: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<any>(`${this.apiBankOtc}/acceptOffer/${id}`, {headers});
    }
    declineBankOffer(id: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<any>(`${this.apiBankOtc}/declineOffer/${id}`, {headers});
    }
    refreshData(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.put<any>(`${this.apiBankOtc}/refresh`, {headers});
    }

}
