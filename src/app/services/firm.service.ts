import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee, Firm, User} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class FirmService {
  // GET/companyAccount/getAll = svi racuni firmi u bazi
  apiUrlFirm = "http://localhost:8080/api/v1";

  constructor(private httpClient : HttpClient) { }

  getAllFirm(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Firm[]>(`${this.apiUrlFirm}/company/getAll`, { headers })
  }

  getFirmById(companyId : number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Firm>(`${this.apiUrlFirm}/company/getByCompany/${companyId}`, { headers })
  }

  createFirm(firm: Firm | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<any>(`${this.apiUrlFirm}/company`, firm, { headers })
  }

  deleteFirm(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.delete<any>(`${this.apiUrlFirm}/company/${id}`, { headers })
  }

  searchFirm(firmName: string, email: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Firm[]>(`${this.apiUrlFirm}/search?firstName=${firmName}&email=${email}`, { headers })
  }
}
