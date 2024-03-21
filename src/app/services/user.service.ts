import { Injectable } from '@angular/core';
import {Account, Employee, Firm, Permission, Role, Token, User} from "../models/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {from, Observable} from "rxjs";
import { parseJson } from '@angular/cli/src/utilities/json-file';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrlUser : string = "http://localhost:8080/api/v1/user"
  apiUrlEmployee : string = "http://localhost:8080/api/v1/employee"
  apiUrlPermission : string = "http://localhost:8080/api/v1/permission"
  apiUrlRole : string = "http://localhost:8080/api/v1/role"
  apiUrlCompany: string = "http://localhost:8080/api/v1/company"
  apiUrlAccount : string = "http://localhost:8080/api/v1/account"
  apiUrlForeignAccount : string = "http://localhost:8080/api/v1/foreignAccount"
  apiUrlCompanyAccount : string = "http://localhost:8080/api/v1/companyAccount"

  constructor(private httpClient : HttpClient) { }

  loginEmployee(email: string | null | undefined, password: string | null | undefined){
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlEmployee}/auth/login`, obj)
  }

  checkEmail(email: string | null | undefined){

    return this.httpClient.get<any>(`${this.apiUrlUser}/isUserActive/${email}`);
  }


  loginUser(email: string | null | undefined, password: string | null | undefined) {
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlUser}/auth/login`, obj)
  }

  setPassword(email:string, activationCode:number, password:string | null | undefined, confirmPassword:string | null | undefined){
    let obj = {
      email: email,
      activationCode: activationCode,
      password: password,
      confirmPassword:confirmPassword
    }
    return this.httpClient.post<any>(`${this.apiUrlUser}/activateUser`, obj)
  }


  registerUser(firstName: string, lastName: string, jmbg: string, dateOfBirth: string, gender: string, phoneNumber: string, email: string){
    let obj = {
      firstName: firstName,
      lastName: lastName,
      jmbg: jmbg,
      dateOfBirth: dateOfBirth,
      gender: gender,
      phoneNumber: phoneNumber,
      email: email
    }

    return this.httpClient.post<Token>(`${this.apiUrlUser}/register`, obj)
  }

  getAllUsers(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<User[]>(`${this.apiUrlUser}/getAll`, { headers })
  }
  //dodaj /getAll
  getAllEmployees(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Employee[]>(`${this.apiUrlEmployee}/getAll`, { headers })
  }
  getAllCurrency(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Account[]>(`${this.apiUrlAccount}/getAll`, { headers })
  }
  getUserById(id : number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<User>(`${this.apiUrlUser}/${id}`, { headers })
  }
  getEmployeeById(id : number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Employee>(`${this.apiUrlEmployee}/${id}`, { headers })
  }

  getAllRoles(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Role[]>(`${this.apiUrlRole}/getAll`, { headers })
  }

   saveAccount(userId: number, balance:number, mark:string, employeeId:number){
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${sessionStorage.getItem('token')}`
     })
     const body = {userId, balance, mark, employeeId};
     return this.httpClient.post<Account[]>(`${this.apiUrlAccount}/`,body,{ headers })
   }
   saveForeignAccount(userId: number, balance:number, mark:string, employeeId:number){
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${sessionStorage.getItem('token')}`
     })
     const body = {userId, balance, mark, employeeId};
     return this.httpClient.post<Account[]>(`${this.apiUrlForeignAccount}/`,body, { headers })
   }
   saveCompanyAccount(userId: number, balance:number, mark:string, employeeId:number){
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${sessionStorage.getItem('token')}`
     })
     const body = {userId, balance, mark, employeeId};
     return this.httpClient.post<Account[]>(`${this.apiUrlCompanyAccount}/`, body,{ headers })
   }

  saveUser(user: User | null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.put<any>(`${this.apiUrlUser}/${user?.userId}`, user, { headers })
  }
  saveEmployee(employee: Employee | null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    console.log(employee)

    return this.httpClient.put<any>(`${this.apiUrlEmployee}/${employee?.employeeId}`, employee, { headers })
  }
  createUser(user: User | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return from([1,2,3]);
    //return this.httpClient.post<any>(`${this.apiUrlUser}`, user, { headers })
  }
  createEmployee(employee: Employee | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<any>(`${this.apiUrlEmployee}`, employee, { headers })
  }

  createFirm(firm: Firm | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<any>(`${this.apiUrlCompany}`, firm, { headers })
  }
  deleteUser(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.delete<any>(`${this.apiUrlUser}/${id}`, { headers })
  }
  deleteEmployee(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.delete<any>(`${this.apiUrlEmployee}/${id}`, { headers })
  }
  searchUsers(firstName: string, lastName: string, email: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<User[]>(`${this.apiUrlUser}/search?firstName=${firstName}&lastName=${lastName}&email=${email}`, { headers })
  }
  searchEmployees(firstName: string, lastName: string, email: string, role: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Employee[]>(`${this.apiUrlEmployee}/search?firstName=${firstName}&lastName=${lastName}&email=${email}&role=${role}`, { headers })
  }
  getAllPermissions(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Permission[]>(`${this.apiUrlPermission}/getAll`,{ headers })
  }
    /** Funkcija za: POST: /api/v1/employee/setPassword/{identifier}, u bodyu ocekuje password.
   * Poziva se iz password-activation komponente prilikom podesavanja sifre zaposlenog.
   *
   * @param identifier
   * @param password
   */
  setEmployeePassword(identifier: string, password: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'text'
    });
    let sendToUrl = "http://localhost:8081/api/v1/employee";  //PORT: 8081 jer user-service zauzme 8080 na beku
    return this.httpClient.post(`${sendToUrl}/setPassword/${identifier}`, password, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }

  // Funkcija koja salje jedan ili drugi POST poziv
  // ( u zavisnosti od toga da li je ulogovan user ili employee )
  // koji trigeruje slanje aktivacionog koda na mail
    resetPassword(email: string, isUser: boolean){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    if(isUser)
      return this.httpClient.get<any>(`${this.apiUrlUser}/resetPassword?email=${email}`, { headers });
    return this.httpClient.get<any>(`${this.apiUrlEmployee}/resetPassword?email=${email}`, { headers });

  }

  // Funkcija koja salje jedan ili drugi POST poziv
  // ( u zavisnosti od toga da li je ulogovan user ili employee )
  // backendu da postavi novi password korisniku/useru
  tryResetPassword(identifier: string, password: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    let body = {
      identifier: identifier,
      password: password
    };

    const isUser = !("role" in parseJson(atob(sessionStorage.getItem("token")!.split('.')[1])));
    if(isUser)
        return this.httpClient.post<any>(`${this.apiUrlUser}/tryPasswordReset`,  body, { headers });
    return this.httpClient.post<any>(`${this.apiUrlEmployee}/tryPasswordReset`, body, { headers });

  }
}
