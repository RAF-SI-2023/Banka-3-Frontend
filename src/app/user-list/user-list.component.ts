import { Component } from '@angular/core';
import { User } from '../models/models';
import { MOCK_EMPLOYEES, MOCK_USERS } from './user-list.mock-data';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  usersFlag = true;
  employeesFlag = false;

  users: User[] = MOCK_USERS;
  employees: User[] = MOCK_EMPLOYEES;
  userColumns: string[] = [ "id","ime", "prezime","jmbg", "datum", "email","telefon", "permisije", "opcije"]


  switchToEmployees(){
    if(this.employeesFlag) return;
    const tmp = this.users;
      this.users = this.employees;
      this.employees = tmp;
      this.usersFlag = !this.usersFlag;
    this.employeesFlag = !this.employeesFlag;
  }
  switchToUsers(){
    if(this.usersFlag) return;
    const tmp = this.users;
      this.users = this.employees;
      this.employees = tmp;
      this.usersFlag = !this.usersFlag;
    this.employeesFlag = !this.employeesFlag;
  }

}
