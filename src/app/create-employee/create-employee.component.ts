import { Component } from '@angular/core';
import {Employee, Permission} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  employee = {} as Employee;
  permissions: Permission[] | null = null;
  constructor(private userService: UserService, private router : Router) {

  }


  save(){
    console.log(this.employee)
    this.userService.createEmployee(this.employee).subscribe(res => {
      console.log(this.employee)
      console.log(res)
      this.router.navigate(['user-list'])
    })
  }

}
