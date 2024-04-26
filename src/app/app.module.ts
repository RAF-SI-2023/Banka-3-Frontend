import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserloginComponent } from './login/userlogin/userlogin.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import {MatSortModule} from "@angular/material/sort";
import {PaswordPopupComponent} from "./pasword-popup/pasword-popup.component";
import { EditUserComponent } from './edit-user/edit-user.component';
import {HttpClientModule} from "@angular/common/http";
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {UserAddAccountFormComponent} from './user-add-account-form/user-add-account-form.component';
import { FirmAddAccountFormComponent } from './firm-add-account-form/firm-add-account-form.component';
import { PasswordActivationComponent } from './password-activation/password-activation.component';
import { UserControllComponent } from './user-controll/user-controll.component';
import { FormAddFirmComponent } from './form-add-firm/form-add-firm.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BillComponent } from './bill/bill.component';
import { PayingComponent } from './paying/paying.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordConfirmationComponent } from './reset-password/password-confirmation/password-confirmation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PopupTransactionComponent } from './popup/popup-transaction/popup-transaction.component';
import { CreditListComponent } from './credit-list/credit-list.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';
import {CommonModule} from "@angular/common";
import { PaymentRecipientComponent } from './payment-recipient/payment-recipient.component';
import { CreatePaymentRecipientComponent } from './create-payment-recipient/create-payment-recipient.component';
import { EditPaymentRecipientComponent } from './edit-payment-recipient/edit-payment-recipient.component';
import { CreditTransactionComponent } from './credit-transaction/credit-transaction.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { CreditListUserComponent } from './credit-list-user/credit-list-user.component';
import { SupervisorListsingListComponent } from './hartije/supervisor-listsing-list/supervisor-listsing-list.component';
import { OptionsComponent } from './options/options.component';
import { ListingListComponent } from './hartije/listing-list/listing-list.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { ChartComponent } from './chart/chart.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { BuyHartijeComponent } from './buy-hartije/buy-hartije.component';
import { BuyHartijePopupComponent } from './buy-hartije-popup/buy-hartije-popup.component';
import { CardViewComponent } from './card-view/card-view.component';
import { FormatdatePipe } from './card-view/date-pipe/formatdate.pipe';
import { BankomatViewComponent } from './bankomat-view/bankomat-view.component';
import { BankomatViewCardComponent } from './bankomat-view-card/bankomat-view-card.component';
import { MyStocksComponent } from './hartije/my-stocks/my-stocks.component';
import { SellHartijeComponent } from './sell-hartije/sell-hartije.component';
import { SellHartijePopupComponent } from './sell-hartije-popup/sell-hartije-popup.component';
import { SellFuturePopup } from './sell-future-popup/buy-future-popup.component';

//import { PasswordActivationComponent } from './reset-password/password-confirmation/password-activation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserloginComponent,
    AdminLoginComponent,
    RegisterComponent,
    RegisterCodeComponent,
    RegisterPasswordComponent,
    UserProfileComponent,
    PaswordPopupComponent,
    EditUserComponent,
    EditEmployeeComponent,
    CreateUserComponent,
    CreateEmployeeComponent,
    UserAddAccountFormComponent,
    FirmAddAccountFormComponent,
    PasswordActivationComponent,
    UserControllComponent,
    FormAddFirmComponent,
    HomePageComponent,
    BillComponent,
    PayingComponent,
    ExchangeComponent,
    ResetPasswordComponent,
    PasswordActivationComponent,
    PasswordConfirmationComponent,
    PopupTransactionComponent,
    PaymentRecipientComponent,
    CreatePaymentRecipientComponent,
    EditPaymentRecipientComponent,
    CreditTransactionComponent,
    CreditListComponent,
    CreditRequestComponent,
    TransactionDetailsComponent,
    CreditListUserComponent,
    SupervisorListsingListComponent,
    OptionsComponent,
    ListingListComponent,
    StockInfoComponent,
    ChartComponent,
    BuyHartijeComponent,
    BuyHartijePopupComponent,
    CardViewComponent,
    FormatdatePipe,
    BankomatViewComponent,
    BankomatViewCardComponent,
    MyStocksComponent,
    SellHartijeComponent,
    SellHartijePopupComponent,
    SellFuturePopup

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatTableModule,
    FormsModule,
    MatSortModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    AgChartsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
