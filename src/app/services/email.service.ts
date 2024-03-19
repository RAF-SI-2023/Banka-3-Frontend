import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiUrlUser : string = "http://localhost:8080/api/v1/user"
  apiUrlEmployee : string = "http://localhost:8080/api/v1/employee"
  apiUrlPermission : string = "http://localhost:8080/api/v1/permission"
  apiUrlRole : string = "http://localhost:8080/api/v1/role"

  constructor(private httpClient: HttpClient) { }

  /**
   * Funkcija koja ce se pozivati nakon klika na 'Kreiraj zaposlenog' i salje link sa aktivacionim kodom na taj mail.
   */
  sendActivationCodeToEmail(email: string){
    return this.httpClient.get<any>(`${this.apiUrlEmployee}/employeeCreated?email=${email}`);
  }


}
