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
import {from, Observable} from "rxjs";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Credit } from '../models/models';





@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrlUser : string = "http://localhost:8080/api/v1/user"
  apiUrlEmployee : string = "http://localhost:8080/api/v1/employee"
  apiUrlEmailUser : string = "http://localhost:8081/api/v1/user"
  apiUrlEmailEmployee : string = "http://localhost:8081/api/v1/employee"
  apiUrlPermission : string = "http://localhost:8080/api/v1/permission"
  apiUrlRole : string = "http://localhost:8080/api/v1/role"
  apiUrlCompany: string = "http://localhost:8080/api/v1/company"
  apiUrlAccount : string = "http://localhost:8080/api/v1/account"
  apiUrlForeignAccount : string = "http://localhost:8080/api/v1/foreignAccount"
  apiUrlCompanyAccount : string = "http://localhost:8080/api/v1/companyAccount"
  apiUrlCurrency : string = "http://localhost:8080/api/v1/currency"
  apiUrlContact : string = "http://localhost:8080/api/v1/contact"
  apiUrlCredit : string = "http://localhost:8080/api/v1/credit"
  apiUrlCreditRequest : string = "http://localhost:8080/api/v1/credit-request"
  apiUrlTransaction: string = "http://localhost:8080/api/v2/transaction"

  constructor(private httpClient : HttpClient) { }

  loginEmployee(email: string | null | undefined, password: string | null | undefined){
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlEmployee}/auth/login`, obj)
  }

  checkEmail(email: string | null | undefined){

    return this.httpClient.get<UserActivationDto>(`${this.apiUrlUser}/isUserActive/${email}`);
  }

  startTransaction(transactionDto: TransactionDto | number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.post<any>(`${this.apiUrlTransaction}/startTransaction`,transactionDto,{headers} )
  }


  loginUser(email: string | null | undefined, password: string | null | undefined) {
    let obj = {
      email: email,
      password: password
    }
    return this.httpClient.post<Token>(`${this.apiUrlUser}/auth/login`, obj)
  }

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

  getAllCredits(): Observable<Credit[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Credit[]>(`${this.apiUrlCredit}`, { headers });
}

  sendCreditRequest(creditRequestData: CreditRequestCreateDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.post<any>(`${this.apiUrlCreditRequest}`, creditRequestData, { headers });
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

    return this.httpClient.get<Currency[]>(`${this.apiUrlCurrency}/getAll`, { headers })
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

  //SAVE ACCOUNT
   saveAccount(userId: number, balance:number, mark:string, employeeId:number, accountType: string){
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${sessionStorage.getItem('token')}`
     })
     const body = {userId, balance: balance, currency: mark, employeeId, accountType: "ZA_MLADE"};
     return this.httpClient.post<Account[]>(`${this.apiUrlAccount}/${userId}`,body,{ headers })
   }
   saveForeignAccount(userId: number, balance:number, mark:string, employeeId:number){
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${sessionStorage.getItem('token')}`
     })
     const body = {userId, balance, currency: mark, employeeId, accountType: "ZA_MLADE"};
     return this.httpClient.post<Account[]>(`${this.apiUrlForeignAccount}/${userId}`,body, { headers })
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

  deleteUsersContact(userId: number, contactId: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    //Proveriti sa bekom koja ce putanja biti za brisanje.
    return this.httpClient.delete(`${this.apiUrlContact}/${userId}/${contactId}`, { headers });
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
  editContact(userId: number, contactId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.put<any>(`${this.apiUrlContact}/${userId}/${contactId}`, { headers });
  }

  getUsersContactByContactId(userId: number, contactId: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.put<any>(`${this.apiUrlContact}/${userId}/${contactId}`, { headers });

  }
}

