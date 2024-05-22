import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './compnents/employee_components/user-list/user-list.component';

import { UserloginComponent } from './compnents/login/userlogin/userlogin.component';
import { AdminLoginComponent } from './compnents/login/admin-login/admin-login.component';
import {UserProfileComponent} from "./compnents/user_components/user-profile/user-profile.component";
import {EditUserComponent} from "./compnents/user_components/edit-user/edit-user.component";
import {EditEmployeeComponent} from "./compnents/employee_components/edit-employee/edit-employee.component";
import {CreateEmployeeComponent} from "./compnents/employee_components/create-employee/create-employee.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {CreateUserComponent} from "./compnents/user_components/create-user/create-user.component";

import {UserAddAccountFormComponent} from "./compnents/employee_components/user-add-account-form/user-add-account-form.component";
import {FirmAddAccountFormComponent} from "./compnents/firm_components/firm-add-account-form/firm-add-account-form.component";
import {UserControllComponent} from "./compnents/employee_components/user-controll/user-controll.component";
import {FormAddFirmComponent} from "./compnents/firm_components/form-add-firm/form-add-firm.component";
import { HomePageComponent } from './compnents/home-page/home-page.component';
import { ExchangeComponent } from './compnents/menjacnica/exchange/exchange.component';
import { BillComponent } from './compnents/transaction_components/bill/bill.component';
import { PayingComponent } from './compnents/transaction_components/paying/paying.component';
import { CreditRequestComponent } from './compnents/credit_components/credit-request/credit-request.component';
import { CreditListComponent } from './compnents/credit_components/credit-list/credit-list.component';
import {PaymentRecipientComponent} from "./compnents/payment_recipient_components/payment-recipient/payment-recipient.component";
import {CreatePaymentRecipientComponent} from "./compnents/payment_recipient_components/create-payment-recipient/create-payment-recipient.component";
import {EditPaymentRecipientComponent} from "./compnents/payment_recipient_components/edit-payment-recipient/edit-payment-recipient.component";
import { CreditTransactionComponent } from './compnents/credit_components/credit-transaction/credit-transaction.component';
import {BankingOfficerGuard} from "./guards/banking-officer.guard";
import {CreditOfficerGuard} from "./guards/credit-officer.guard";
import {UserGuard} from "./guards/user.guard";
import {TransactionDetailsComponent} from "./compnents/transaction_components/transaction-details/transaction-details.component";
import {CreditListUserComponent} from "./compnents/credit_components/credit-list-user/credit-list-user.component";
import { OptionsComponent } from './compnents/listing_components/options/options.component';
import {CardViewComponent} from "./compnents/card_components/card-view/card-view.component";
import { BankomatViewComponent } from './compnents/card_components/bankomat-view/bankomat-view.component';
import { BankomatViewCardComponent } from './compnents/card_components/bankomat-view-card/bankomat-view-card.component';
import { SupervisorGuard } from './guards/supervisor.guard';
import {AgentGuard} from "./guards/agent.guard";
import {ResetPasswordComponent} from "./compnents/password_components/reset-password/reset-password.component";
import { PasswordConfirmationComponent } from "./compnents/password_components/reset-password/password-confirmation/password-confirmation.component";
import { PasswordActivationComponent } from "./compnents/password_components/password-activation/password-activation.component";
import { SupervisorListsingListComponent } from "./compnents/listing_components/supervisor-listsing-list/supervisor-listsing-list.component";
import {ListingListComponent} from "./compnents/listing_components/listing-list/listing-list.component";
import {StockInfoComponent} from "./compnents/listing_components/stock-info/stock-info.component";
import {BuyHartijeComponent} from "./compnents/listing_components/buy-hartije/buy-hartije.component";
import {SellHartijeComponent} from "./compnents/listing_components/sell-hartije/sell-hartije.component";
import {BuyHartijePopupComponent} from "./compnents/listing_components/buy-hartije-popup/buy-hartije-popup.component";
import {MyStocksComponent} from "./compnents/listing_components/my-stocks/my-stocks.component";
import {CompanyLoginComponent} from "./compnents/login/company-login/company-login.component";
import {CompanyHomePageComponent} from "./compnents/company-home-page/company-home-page.component";
import { OtcViewComponent } from './compnents/otc/otc-view/otc-view.component';
import { SetStockVisibilityComponent } from './compnents/listing_components/set-stock-visibility/set-stock-visibility.component';
import { CompanyGuard } from './guards/company.guard';


const routes: Routes = [

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
    path: 'forgot-password/:type',
    component: ResetPasswordComponent,
  },
  {
    path: ':tip/password-confirm/:code',
    component: PasswordConfirmationComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'company-login',
    component: CompanyLoginComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'add-employee',
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'add-user',
    component: CreateUserComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'company-home',
    component: CompanyHomePageComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path: 'user-account/:userId',
    component: UserAddAccountFormComponent,
    canActivate: [AuthGuard, BankingOfficerGuard]
  },
  {
    path: 'firm-account/:firmId',
    component: FirmAddAccountFormComponent,
    canActivate: [AuthGuard, BankingOfficerGuard]
  },
  {
    path: 'user-control',
    component: UserControllComponent,
    canActivate: [AuthGuard, BankingOfficerGuard]
  },
  {
    path: 'exchange',
    component: ExchangeComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'bill',
    component: BillComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'payment',
    component: PayingComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'form-add-firm',
    component: FormAddFirmComponent,
    canActivate: [AuthGuard, BankingOfficerGuard]
  },
  {
    path: 'credit-request',
    component: CreditRequestComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'credit-list',
    component: CreditListComponent,
    canActivate: [AuthGuard, CreditOfficerGuard]
  },
  {
    path: 'change-password/:code',
    component: PasswordActivationComponent
  },
  {
    path: 'add-payment-recipient',
    component: CreatePaymentRecipientComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'edit-payment-recipient/:contactId',
    component: EditPaymentRecipientComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'credit-transaction/:userId',
    component: CreditTransactionComponent,
  },
  {
    path: 'payment-recipients',
    component: PaymentRecipientComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'transaction-details',
    component: TransactionDetailsComponent,
//   canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'supervisor-listing',
    component: SupervisorListsingListComponent,
   // canActivate: [AuthGuard, SupervisorGuard] //treba postaviti gard za supervizora --> postavljen
  },
  {
    path : 'options/:ticker',
    component: OptionsComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'credit-list-user',
    component: CreditListUserComponent,
   canActivate:[AuthGuard, UserGuard]
  },
  {
    path : 'listing-list',
    component: ListingListComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'stock-info/:ticker',
    component: StockInfoComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'buy-hartije/:ticker',
    component: BuyHartijeComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'sell-hartije/:ticker',
    component: SellHartijeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'buy-hartije-popup',
    component:BuyHartijePopupComponent,
    // canActivate:[AuthGuard, AgentGuard]
  },
  {
    path: 'bankomat',
    component:BankomatViewComponent,
    canActivate:[AuthGuard, UserGuard]
  },
  {
    path: 'card-view',
    component: CardViewComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'bankomat-card',
    component: BankomatViewCardComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'my-listings',
    component: MyStocksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'otc',
    component: OtcViewComponent,
    // canActivate: [AuthGuard, UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
