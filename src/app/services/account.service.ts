import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  Account,
  AccountDto,
  Card, ConfirmTransactionDto, Contract, ContractAnswerDto, Credit, CreditRequestCreateDto,
  CreditRequestDto,
  Currency, CurrencyExchangeDto,
  Firm,
  FirmCreateDto, MarginAccount,
  TransactionDto,
} from "../models/models";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrlAccount: string = environment.bankServiceUrl + "/api/v1/account"
  apiUrlEmailTransaction: string = environment.emailServiceUrl + "/api/v1/transaction"
  apiUrlBank: string = environment.bankServiceUrl + "/api/v1/transaction"
  apiUrlCompany: string = environment.userServiceUrl + "/api/v1/company"
  apiUrlCompanyAccount: string = environment.bankServiceUrl + "/api/v1/companyAccount"
  apiUrlCurrency: string = environment.bankServiceUrl + "/api/v1/currency"
  apiUrlCard: string = environment.bankServiceUrl + "/api/v1/card"
  apiUrlCreditRequest: string = environment.bankServiceUrl + "/api/v1/credit-request"
  apiUrlCredit: string = environment.bankServiceUrl + "/api/v1/credit"
  apiUrlCurrencyExchange: string = environment.bankServiceUrl + "/api/v1/currencyExchange"
  apiUrlContract: string = environment.bankServiceUrl + "/api/v1/contract"
  apiUrlExchange: string = environment.bankServiceUrl + "/api/v1/currencyExchange"

  constructor(private httpClient : HttpClient) { }

  getAccountsByUserId(userId: number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<AccountDto[]>(`${this.apiUrlAccount}/getByUser/${userId}`, {headers})

  }
  getCompanyAccountsByCompanyId(companyId: number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<AccountDto[]>(`${this.apiUrlCompanyAccount}/getByCompany/${companyId}`, {headers})

  }

  sendTransaction(transaction: TransactionDto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<ConfirmTransactionDto>(`${this.apiUrlBank}/startPaymentTransaction`, transaction, {headers})
  }
  confirmTransaction(transactionId: number, code: number | undefined)  {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let obj = {
      transactionId,
      code
    }

    return this.httpClient.post<string>(`${this.apiUrlEmailTransaction}/confirm`, obj, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  getAllTransactionsByAccountId(accountId: string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<TransactionDto[]>(`${this.apiUrlBank}/getAllPaymentTransactions/${accountId}`, {headers})
  }

  saveAccount(userId: number, balance:number, mark:string, employeeId:number, accountType: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let newMark = ''
    switch (mark){
      case "EURO":
        newMark = "EUR"
        break;
      case "RSD":
        newMark = "RSD"
        break;
      case "DOLLAR":
        newMark = "USD"
        break;
    }

    const body = {userId, availableBalance: balance, currencyMark: newMark, employeeId, accountType: accountType};
    return this.httpClient.post<Account[]>(`${this.apiUrlAccount}/createAccount`,body,{ headers })
  }

  saveMarginAccount(employeeId: number, userId: number, balance: number ,initialMargine: number, maitenanceMargine: number, bankParticipation: number, accountType: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    const body = {
      employeeId: employeeId,
      userId: userId,
      balance: balance,
      initialMargine: initialMargine,
      maitenanceMargine: maitenanceMargine,
      bankParticipation: bankParticipation/100, // da se salje kao 0.1, 0.2, ...
      accountType: accountType
    };

    return this.httpClient.post<Account[]>(`${this.apiUrlAccount}/createMarginAccount`, body,{ headers })
  }


  saveCompanyAccount(companyId: number, balance:number, mark:string, employeeId:number, accountType: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    const body = {
      companyId : companyId,
      balance : balance,
      currencyMark: mark,
      employeeId: employeeId,
      accountType: accountType

    };
    return this.httpClient.post<Account[]>(`${this.apiUrlCompanyAccount}/createAccount`, body,{ headers })
  }

  saveMarginAccountFirm(employeeId: number, companyID: number, balance: number ,initialMargine: number, maitenanceMargine: number, bankParticipation: number, accountType: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    const body = {
      employeeId: employeeId,
      companyID: companyID,
      balance: balance,
      initialMargine: initialMargine,
      maitenanceMargine: maitenanceMargine,
      bankParticipation: bankParticipation/100, // da se salje kao 0.1, 0.2, ...
      accountType: accountType
    };

    return this.httpClient.post<Account[]>(`${this.apiUrlCompanyAccount}/createMarginAccount`, body,{ headers })
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

    return this.httpClient.get<Firm[]>(`http://" + environment.userServiceUrl + "/api/v1/search?firstName=${firmName}&email=${email}`, { headers })
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
    return this.httpClient.get<Card[]>(`${this.apiUrlCard}/getAllByUser/${userId}`, { headers });
  }

  loginCard(userId: number, accountNumber: string, cvc: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    const body = { userId, accountNumber, cvv: cvc };
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
    return this.httpClient.get<CreditRequestDto[]>(`${this.apiUrlCreditRequest}`, {headers})
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
    return this.httpClient.put<CreditRequestDto>(`${this.apiUrlCreditRequest}`, obj, {
      headers,
      responseType: 'text' as 'json'
    })

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
    return this.httpClient.post<any>(`${this.apiUrlCreditRequest}`, creditRequestData, {
      headers,
      responseType: 'text' as 'json'
    });
  }
  sendCurrencyExchange(currencyExchangeDto: CurrencyExchangeDto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlCurrencyExchange}`, currencyExchangeDto, {
      headers,
      responseType: 'text' as 'json'
    });
  }
  supervisorAccept(contractAnswerDto: ContractAnswerDto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlContract}`+'/supervisorAccept', contractAnswerDto, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  supervisorDecline(contractAnswerDto: ContractAnswerDto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlContract}`+'/supervisorDecline', contractAnswerDto, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  getAllContracts(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Contract[]>(`${this.apiUrlContract}`+'/getAllSupervisor', {
      headers,
      responseType: 'text' as 'json'
    });
  }
  getProfits(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<any>(`${this.apiUrlExchange}`, {headers});
  }

  getMarginAccountForUser(userId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<MarginAccount>(`${this.apiUrlAccount}/getMarginUser/${userId}`, {headers});
  }
  getMarginAccountForCompany(companyId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<MarginAccount>(`${this.apiUrlAccount}/getMarginCompany/${companyId}`, {headers});

  }
}
