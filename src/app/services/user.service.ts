import { Injectable } from '@angular/core';
import {
  Account,
  Currency,
  Employee,
  Firm,
  Permission,
  Role,
  Token,
  TransactionDto,
  User,
  Contact,
  UserActivationDto,
  CreditRequestCreateDto
} from "../models/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Credit } from '../models/models';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrlUser : string = environment.userServiceUrl + "/api/v1/user"
  apiUrlCompany : string = environment.userServiceUrl + "/api/v1/company"
  apiUrlEmployee : string = environment.userServiceUrl + "/api/v1/employee"
  apiUrlEmailUser : string = environment.emailServiceUrl + "/api/v1/user"
  apiUrlEmailCompany : string = environment.emailServiceUrl + "/api/v1/company"
  apiUrlEmailEmployee : string = environment.emailServiceUrl + "/api/v1/employee"
  apiUrlPermission : string = environment.userServiceUrl + "/api/v1/permission"
  apiUrlRole : string = environment.userServiceUrl + "/api/v1/role"
  apiUrlContact : string = environment.userServiceUrl + "/api/v1/contact"

  constructor(private httpClient : HttpClient) { }

  loginEmployee(email: string | null | undefined, password: string | null | undefined){
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlEmployee}/auth/login`, obj)
  }

  /**
    *   Check Email User
    *   @param email Email korisnika koji proverava da li postoji email usera i da li je aktiviran.
    *
    */

  checkEmail(email: string | null | undefined){
    return this.httpClient.get<UserActivationDto>(`${this.apiUrlUser}/isUserActive/${email}`);
  }

  /**
    *   Check Email Company
    *   @param email Email korisnika koji proverava da li postoji email kompanije i da li je aktiviran.
    *
    */

  checkEmailCompany(email: string | null | undefined){
    return this.httpClient.get<UserActivationDto>(`${this.apiUrlCompany}/isCompanyActive/${email}`);
  }

  /**
    *   Login korisnika
    *   @param email Email korisnika
    *   @param password Sifra korisnika
    *
    */

  loginUser(email: string | null | undefined, password: string | null | undefined) {
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlUser}/auth/login`, obj)
  }

  /**
    *   Login company
    *   @param email Email kompanije
    *   @param password Sifra kompanije
    *
    */

  loginCompany(email: string | null | undefined, password: string | null | undefined) {
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlCompany}/auth/login`, obj)
  }

  /**
    *   Set password user
    *   @param email Email korisnika
    *   @param activationCodeSifra Kod za postavljanje sifre
    *   @param password Sifra koja se postavlja
    *
    */

  setPassword(email:string, activationCode:number, password:string | null | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let obj = {
      email: email,
      code: activationCode,
      password: password,
    }
    console.log(obj)
    return this.httpClient.post<any>(`${this.apiUrlEmailUser}/activateUser`, obj, {headers})
  }

  /**
    *   Set password company
    *   @param email Email kompanije
    *   @param activationCodeSifra Kod za postavljanje sifre
    *   @param password Sifra koja se postavlja
    *
    */

  setPasswordCompany(email:string, activationCode:number, password:string | null | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let obj = {
      email: email,
      code: activationCode,
      password: password,
    }
    return this.httpClient.post<any>(`${this.apiUrlEmailCompany}/activateCompany`, obj, {headers})
  }

  /**
    *   Get all users
    *   Dohvatanje svih korisnika
    */

  getAllUsers(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<User[]>(`${this.apiUrlUser}/getAll`, { headers })
  }

  /**
    *   Get all employees
    *   Dohvatanje svih zaposlenih.
    */

  getAllEmployees(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Employee[]>(`${this.apiUrlEmployee}/getAll`, { headers })
  }

  /**
    *   Get user by id
    *   Dohvatanje korisnika po id-u
    */

  getUserById(id : number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<User>(`${this.apiUrlUser}/${id}`, { headers })
  }

  /**
    *   Get employee by id
    *   Dohvatanje zaposlenog po id-u.
    */

  getEmployeeById(id : number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<Employee>(`${this.apiUrlEmployee}/findById/${id}`, { headers })
  }

  /**
    *   Get all roles
    *   Dohvatanje svih rolova.
    */

  getAllRoles(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Role[]>(`${this.apiUrlRole}/getAll`, { headers })
  }

  /**
    *   Save user
    *   Sacuvanje korisnika odn 'put' na backu.
    */

  saveUser(user: User | null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.put<any>(`${this.apiUrlUser}/${user?.userId}`, user, { headers })
  }

  /**
    *   Save employee
    *   Sacuvanje zaposlenog odn 'put' na backu.
    */

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
    // return from([1,2,3]);
    return this.httpClient.post<any>(`${this.apiUrlUser}`, user, { headers })
  }
  createEmployee(employee: Employee | undefined){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.post<any>(`${this.apiUrlEmployee}`, employee, { headers })
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
    // let sendToUrl = environment.emailServiceUrl + "/api/v1/employee";  //PORT: 8081 jer user-service zauzme 8080 na beku
    return this.httpClient.post<any>(`${this.apiUrlEmailEmployee}/setPassword/${identifier}`, password, {headers});
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
      return this.httpClient.get<any>(`${this.apiUrlEmailUser}/resetPassword?email=${email}`, { headers });
    return this.httpClient.get<any>(`${this.apiUrlEmailEmployee}/resetPassword?email=${email}`, { headers });

  }

  // Funkcija koja salje jedan ili drugi POST poziv
  // ( u zavisnosti od toga da li je ulogovan user ili employee )
  // backendu da postavi novi password korisniku/useru
  tryResetPassword(identifier: string, password: string, tip: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    let body = {
      identifier: identifier,
      password: password
    };

    // const isUser = !("role" in parseJson(atob(sessionStorage.getItem("token")!.split('.')[1])));
    if(tip === "employee")
        return this.httpClient.post<any>(`${this.apiUrlEmailEmployee}/tryPasswordReset`,  body, { headers });
    return this.httpClient.post<any>(`${this.apiUrlEmailUser}/tryPasswordReset`, body, { headers });

  }


  sendRequest(): Promise<any> {
    const url = 'http://putanja-ka-vasem-backend-servisu';

    return this.httpClient.get(url).toPromise();
  }

  // ovde sam improvizao samo kako ce se proveravati kod koji se dobije na mailu posto nemam putanju za to
  mailRequest(code : number) {
    return this.httpClient.get(`${this.apiUrlEmployee}`)
  }
  /**
   * Funkcija za dohvatanje svih kontakata korisnika sa prosledjenim ID-em.
   * @param userId ID Korisnika
   */
  getUsersContactsById(userId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Contact[]>(`${this.apiUrlContact}/${userId}`, { headers });
  }

  deleteUsersContact(contactId: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    //Proveriti sa bekom koja ce putanja biti za brisanje.
    return this.httpClient.delete(`${this.apiUrlContact}/${contactId}`, { headers });
  }

  //Funkcija za dodavanje kontakta korisniku
  addContact(userId: number, contactData: Contact) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.post<any>(`${this.apiUrlContact}/${userId}`,contactData, {headers});
  }

  //Funkcija za izmenu kontakta
  editContact(contactData: Contact, contactId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.put<any>(`${this.apiUrlContact}/${contactId}`, contactData, { headers });
  }

}

