import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

import { RegisterComponent } from './register/register.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { UserloginComponent } from './login/userlogin/userlogin.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";

const routes: Routes = [

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register/code',
    component: RegisterCodeComponent,
  },
  {
    path: 'register/password',
    component: RegisterPasswordComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user-login',
    component: UserloginComponent,
  },
  {
    path: '',
    redirectTo: "/user-login",
    pathMatch: "full"
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
  },
  {
    path: 'add-employee',
    component: CreateEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
