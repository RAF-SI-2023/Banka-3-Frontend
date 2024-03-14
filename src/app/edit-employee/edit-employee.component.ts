import {Component, OnInit} from '@angular/core';
import {Employee, Permission, User} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit{

  employee: Employee | null = null;
  permissions: Permission[] | null = null;
  constructor(private userService: UserService, private route : ActivatedRoute, private router : Router) {
  }


  save(){
    this.userService.saveEmployee(this.employee).subscribe(res => {
      console.log(this.employee)
      console.log(res)
      this.router.navigate(['user-list'])
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      console.log(userId)
      this.userService.getEmployeeById(userId).subscribe(res => {
        this.employee = res
        console.log(this.employee?.permissions)
      });
      this.userService.getAllPermissions().subscribe(res => {
        this.permissions = res
        // console.log(this.permissions)
      })
    });
  }
  isPermissionSelected(permission: Permission): boolean |undefined {
    return this.employee?.permissions.some(userPermission => userPermission.authority === permission.authority);
  }
  togglePermission(permission: any): void {
    const index = this.employee?.permissions.findIndex(userPermission => userPermission.authority === permission.authority);
    if (index !== -1) {
      // Permission already exists, remove it
      this.employee?.permissions.splice(index!, 1);
    } else {
      // Permission does not exist, add it
      this.employee?.permissions.push(permission);
    }
    // Update the user permissions in the service

  }
}
