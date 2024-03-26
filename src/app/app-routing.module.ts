import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

import { RegisterComponent } from './register/register.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { UserloginComponent } from './login/userlogin/userlogin.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {A} from "@angular/cdk/keycodes";
import {CreateUserComponent} from "./create-user/create-user.component";

import {UserAddAccountFormComponent} from "./user-add-account-form/user-add-account-form.component";
import {FirmAddAccountFormComponent} from "./firm-add-account-form/firm-add-account-form.component";
import {PasswordActivationComponent} from "./password-activation/password-activation.component";
import {UserControllComponent} from "./user-controll/user-controll.component";
import {FormAddFirmComponent} from "./form-add-firm/form-add-firm.component";
import { HomePageComponent } from './home-page/home-page.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { BillComponent } from './bill/bill.component';
import { PayingComponent } from './paying/paying.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {PasswordConfirmationComponent} from "./reset-password/password-confirmation/password-confirmation.component";
import {PaymentRecipientComponent} from "./payment-recipient/payment-recipient.component";
import {CreatePaymentRecipientComponent} from "./create-payment-recipient/create-payment-recipient.component";
import {EditPaymentRecipientComponent} from "./edit-payment-recipient/edit-payment-recipient.component";
import { CreditTransactionComponent } from './credit-transaction/credit-transaction.component';


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
    //canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user-login',
    component: UserloginComponent,
  },
  {
    path: 'forgot-password/:type',
    component: ResetPasswordComponent,
  },
  {
    path: ':tip/password-confirm/:code',
    component: PasswordConfirmationComponent,
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
    //canActivate: [AuthGuard]
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    //canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
    //canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'add-employee',
    component: CreateEmployeeComponent,
    //canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'add-user',
    component: CreateUserComponent,
    //canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    //canActivate: [AuthGuard]
  },{
  path: 'welcome',
  component: HomePageComponent,
  //canActivate: [AuthGuard]
},
  {
    path: 'user-account/:userId',
    component: UserAddAccountFormComponent,
    //canActivate: [AuthGuard,RoleGuard]
  },
  {
    path: 'firm-account/:firmId',
    component: FirmAddAccountFormComponent,
    //canActivate: [AuthGuard,RoleGuard]
  },
  {
      path: 'user-controll',
    component: UserControllComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'exchange',
    component: ExchangeComponent,
    //canActivate: [AuthGuard]
  },
  {
  path: 'bill',
  component: BillComponent,
  //canActivate: [AuthGuard]
},
  {
  path: 'payment',
  component: PayingComponent,
  //canActivate: [AuthGuard]
  },
  {
    path: 'form-add-firm',
    component: FormAddFirmComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'change-password/:code',
    component: PasswordActivationComponent
  },
  {
    path: 'payment-recipients',
    component: PaymentRecipientComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
