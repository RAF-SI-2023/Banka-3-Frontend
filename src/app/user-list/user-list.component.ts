import {Component, OnInit} from '@angular/core';
import {Employee, User} from '../models/models';
// import { MOCK_EMPLOYEES, MOCK_USERS } from './user-list.mock-data';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  usersFlag = true;
  employeesFlag = false;
  // currUser: object = atob(sessionStorage.getItem("token")!.split(".")[1]);
  frstName: string = '';
  lstName: string = '';
  eml: string = '';
  role: string = '';
  firstName2: string = '';
  lastName2: string = '';
  email2: string = '';

  users: User[] = [];
  employees: Employee[] = [];
  userColumns: string[] = [ "userId","firstName", "lastName","jmbg", "dateOfBirth", "email","phoneNumber", "opcije"]
  employeeColumns: string[] = [ "employeeId","firstName", "lastName","jmbg", "dateOfBirth", "email","phoneNumber", "roleName", "opcije"]


  constructor(private userService : UserService, private router: Router) {
  }

  //show only active users
  switchToEmployees(){
    if(this.employeesFlag) return;
    this.usersFlag = !this.usersFlag;
    this.employeesFlag = !this.employeesFlag;
    this.userService.getAllEmployees().subscribe( res=> {
      this.employees = res;
    })
  }
  switchToUsers(){
    if(this.usersFlag) return;
    this.usersFlag = !this.usersFlag;
    this.employeesFlag = !this.employeesFlag;
    this.userService.getAllUsers().subscribe( res=> {
      this.users = res;
    })

  }
  searchEmployee(){
    this.userService.searchEmployees(this.firstName2, this.lastName2, this.email2, this.role).subscribe(res => {
      this.employees = res;
    })
  }
  searchUser(){
    this.userService.searchUsers(this.frstName, this.lstName, this.eml).subscribe(res => {
      this.users = res
    })
  }
  deleteEmployee(id: number){
    this.userService.deleteEmployee(id).subscribe(res => {
      console.log(res)
      this.employees.filter( employee => {
        return employee.isActive
      })
    })
    console.log(id)
  }
  editEmployee(employee: Employee){
    this.router.navigate(['edit-employee', employee.employeeId])
  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(res => {
      this.users.filter(user => {
        return user.isActive
      })
      console.log(res)
    })
  }
  editUser(user: User){
    this.router.navigate(['edit-user', user.userId])
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe( res=> {
      this.users = res;
      this.users.filter(user => {
        return user.isActive
      })
    })
    this.userService.getAllEmployees().subscribe( res=> {
      this.employees = res;
      this.employees.filter( employee => {
        return employee.isActive
      })
    })
  }

}
