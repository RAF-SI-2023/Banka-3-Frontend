import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Credit, CreditRequestDto} from '../models/models';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private credits: Credit[] = [
  ];

  apiUrlCreditRequest: string = "http://localhost:8080/api/v1/credit-request"

  constructor(private httpClient: HttpClient) { }

  // getCreditDetails(creditId: number): Observable<Credit | null> {
  //   // const credit = this.credits.find(c => c.id == creditId);
  //   // return of(credit || null); // Return null if credit is not found
  // }

  getAllCredits(): Observable<CreditRequestDto[]> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<CreditRequestDto[]>(`${this.apiUrlCreditRequest}/getAll`,{headers} )
  }

  getCreditDetails(userId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<CreditRequestDto>(`${this.apiUrlCreditRequest}/${userId}`,{headers} )

  }
  approveCredit(creditRequestId : number, approve: boolean){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    let obj = {
      creditRequestId,
      accepted: approve
    }
    return this.httpClient.put<CreditRequestDto>(`${this.apiUrlCreditRequest}`, obj,{headers} )

  }
  // getCreditDetails(creditId: number): Observable<Credit | null> {
  //   const url = `some-url/api/v1/credit/${creditId}`;
  //   return this.http.get<Credit>(url);
  // }
}
