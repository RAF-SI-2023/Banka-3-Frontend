import {Component, OnInit} from '@angular/core';
import {Employee, Firm, User} from "../models/models";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-controll',
  templateUrl: './user-controll.component.html',
  styleUrls: ['./user-controll.component.css']
})
export class UserControllComponent implements OnInit{

  usersFlag = true;
  firmaFlag = false;
  // currUser: object = atob(sessionStorage.getItem("token")!.split(".")[1]);
  frstName: string = '';
  lstName: string = '';
  eml: string = '';
  role: string = '';
  firmName: string = '';
  firmEmail: string = '';

  users: User[] = [];
  firm: Firm[] = [];
  userColumns: string[] = [ "userId","firstName", "lastName","jmbg", "dateOfBirth", "email","phoneNumber", "opcije"]
  firmColumns: string[] = [ "firmId","firmName", "email","phoneNumber", "matNumberFirm", "pib","industryCode", "opcije"]


  constructor(private userService : UserService, private router: Router) {
  }

  //show only active users
  switchToFirm(){
    if(this.firmaFlag) return;
    this.usersFlag = !this.usersFlag;
    this.firmaFlag = !this.firmaFlag;
   /* this.userService.getAllEmployees().subscribe( res=> {
      this.employees = res;
    })*/
  }
  switchToUsers(){
    if(this.usersFlag) return;
    this.usersFlag = !this.usersFlag;
    this.firmaFlag = !this.firmaFlag;
    this.userService.getAllUsers().subscribe( res=> {
      this.users = res;
    })

  }
  searchFirm(){}
  searchUser(){
    this.userService.searchUsers(this.frstName, this.lstName, this.eml).subscribe(res => {
      this.users = res
    })
  }
  deleteFirm(id: number){
   /* this.userService.deleteEmployee(id).subscribe(res => {
      console.log(res)
      this.employees.filter( employee => {
        return employee.isActive
      })
    })*/
    console.log(id)
  }
  editFirm(firm: Firm){
   // this.router.navigate(['edit-employee', employee.employeeId])
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
    /*this.userService.getAllEmployees().subscribe( res=> {
      this.employees = res;
      this.employees.filter( employee => {
        return employee.isActive
      })
    })*/
  }
}
