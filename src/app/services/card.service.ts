import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrlCard: string = "http://localhost:8082/api/v1/card"

  constructor(private httpClient: HttpClient) { }

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


}
