import {Component, OnInit} from '@angular/core';
import {Employee, Firm, User} from "../../../models/models";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FirmService} from "../../../services/firm.service";

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
  firmColumns: string[] = [ "companyId","title", "email","number", "maticniBroj", "pib","sifraDelatnosti", "opcije"]


  constructor(private firmService : FirmService, private userService : UserService, private router: Router) {
  }

  switchToFirm(){
    if(this.firmaFlag) return;
    this.usersFlag = !this.usersFlag;
    this.firmaFlag = !this.firmaFlag;
    this.firmService.getAllFirm().subscribe( res=> {
      this.firm = res;
    })
  }
  switchToUsers(){
    if(this.usersFlag) return;
    this.usersFlag = !this.usersFlag;
    this.firmaFlag = !this.firmaFlag;
    this.userService.getAllUsers().subscribe( res=> {
      this.users = res;
    })

  }
  searchFirm(){
    this.firmService.searchFirm(this.frstName, this.eml).subscribe(res => {
      this.firm = res
    })
  }
  searchUser(){
    this.userService.searchUsers(this.frstName, this.lstName, this.eml).subscribe(res => {
      this.users = res
    })
  }
  deleteFirm(id: number){
    this.firmService.deleteFirm(id).subscribe(res => {
      console.log(res)
    })
    console.log(id)
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

  createAccount(user: User){
    this.router.navigate(['user-account', user.userId])
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe( res=> {
      this.users = res;
      this.users.filter(user => {
        return user.isActive
      })
    })
    this.firmService.getAllFirm().subscribe( res=> {
      this.firm = res;
    })
  }
}
