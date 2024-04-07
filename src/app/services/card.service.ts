import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrlCard: string = "http://localhost:8080/api/v1/card"

  constructor(private httpClient: HttpClient) { }

  getCardsByAccountNumber(accountNumber: number): Observable<Card[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Card[]>(`${this.apiUrlCard}/getAll/${accountNumber}`, { headers });
  }


}
