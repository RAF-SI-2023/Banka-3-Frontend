import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountDto, TransactionDto} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrlAccount = "http://localhost:8080/api/v1/account"
  apiUrlBank = "http://localhost:8082/api/v1/transaction"
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
  confirmTransaction(transactionId: number, code: number | undefined){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let obj = {
      transactionId,
      code
    }

    return this.httpClient.post<any>(`${this.apiUrlBank}/confirmTransaction`, obj, {headers})
  }

  getAllTransactionsByAccountId(accountId: string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<TransactionDto[]>(`${this.apiUrlBank}/getAllTransactions/${accountId}`, {headers})
  }


}
