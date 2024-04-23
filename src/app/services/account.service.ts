import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  Account,
  AccountDto,
  Card, Credit, CreditRequestCreateDto,
  CreditRequestDto,
  Currency,
  Firm,
  FirmCreateDto,
  TransactionDto,
} from "../models/models";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrlAccount: string = "http://localhost:8082/api/v1/account"
  apiUrlBank: string = "http://localhost:8082/api/v1/transaction"
  apiUrlCompany: string = "http://localhost:8082/api/v1/company"
  apiUrlCompanyAccount: string = "http://localhost:8082/api/v1/companyAccount"
  apiUrlCurrency: string = "http://localhost:8082/api/v1/currency"
  apiUrlCard: string = "http://localhost:8082/api/v1/card"
  apiUrlCreditRequest: string = "http://localhost:8080/api/v1/credit-request"
  apiUrlCredit: string = "http://localhost:8080/api/v1/credit"
  constructor(private httpClient : HttpClient) { }

  getAccountsByUserId(userId: number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<AccountDto[]>(`${this.apiUrlAccount}/getByUser/${userId}`, {headers})

  }

  sendTransaction(transaction: TransactionDto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<number>(`${this.apiUrlBank}/startTransaction`, transaction, {headers})
  }
  confirmTransaction(transactionId: number, code: number | undefined)  {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let obj = {
      transactionId,
      code
    }

    // return this.httpClient.post<string>(`${this.apiUrlBank}/confirmTransaction`, obj, {headers})

    return this.httpClient.post<string>(`${this.apiUrlBank}/confirmTransaction`, obj, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  getAllTransactionsByAccountId(accountId: string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<TransactionDto[]>(`${this.apiUrlBank}/getAllTransactions/${accountId}`, {headers})
  }

  saveAccount(userId: number, balance:number, mark:string, employeeId:number, accountType: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const body = {userId, balance: balance, currency: mark, employeeId, accountType: "ZA_MLADE"};
    return this.httpClient.post<Account[]>(`${this.apiUrlAccount}/createAccount`,body,{ headers })
  }


  saveCompanyAccount(companyId: number, balance:number, mark:string, employeeId:number, accountType: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    const body = {
      companyId : companyId ,
      balance : balance ,
      currency: mark ,
      employeeId: employeeId,
      accountType: accountType

    };
    return this.httpClient.post<Account[]>(`${this.apiUrlCompanyAccount}/${companyId}`, body,{ headers })
  }

  //FIRMA

  getAllFirm(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Firm[]>(`${this.apiUrlCompany}/getAll`, { headers })
  }

  getFirmById(companyId : number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Firm>(`${this.apiUrlCompany}/getByCompany/${companyId}`, { headers })
  }

  createFirm(firm: FirmCreateDto | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<any>(`${this.apiUrlCompany}`, firm, { headers })
  }

  deleteFirm(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.delete<any>(`${this.apiUrlCompany}/${id}`, { headers })
  }

  //OVO NE POSTOJI?!?
  searchFirm(firmName: string, email: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Firm[]>(`http://localhost:8080/api/v1/search?firstName=${firmName}&email=${email}`, { headers })
  }

  getAllCurrency(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Currency[]>(`${this.apiUrlCurrency}/getAll`, { headers })
  }

  getCardsByUserId(userId: number): Observable<Card[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Card[]>(`${this.apiUrlCard}/getAll/${userId}`, { headers });
  }

  loginCard(userId: number, accountNumber: string, cvc: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    const body = { userId, accountNumber, cvc };
    return this.httpClient.post<any>(`${this.apiUrlCard}/cardLogin`, body, { headers });
  }

  sendDepositRequest(accountNumber: string, amount: number): Observable<any> {
    const body = { accountNumber, amount };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlCard}/deposit`, body, { headers });
  }

  sendWithdrawRequest(accountNumber: string, amount: number): Observable<any> {
    const body = { accountNumber, amount };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlCard}/withdraw`, body, { headers });
  }
  getAllCreditRequests(): Observable<CreditRequestDto[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<CreditRequestDto[]>(`${this.apiUrlCreditRequest}/getAll`, {headers})
  }

  getCreditDetails(userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<CreditRequestDto>(`${this.apiUrlCreditRequest}/${userId}`, {headers})

  }

  approveCredit(creditRequestId: number, approve: boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let obj = {
      creditRequestId: creditRequestId,
      accepted: approve
    }
    console.log(obj)
    return this.httpClient.put<CreditRequestDto>(`${this.apiUrlCreditRequest}`, obj, {headers})

  }

  // getCreditDetails(creditId: number): Observable<Credit | null> {
  //   const url = `some-url/api/v1/credit/${creditId}`;
  //   return this.http.get<Credit>(url);
  // }

  getAllCreditsByUserId(userId: number) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Credit[]>(`${this.apiUrlCredit}/${userId}`, {headers})
  }

  getAllCredits(): Observable<Credit[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Credit[]>(`${this.apiUrlCredit}`, {headers});
  }
  sendCreditRequest(creditRequestData: CreditRequestCreateDto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlCreditRequest}`, creditRequestData, { headers });
  }

}
