import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './compnents/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserListComponent } from './compnents/employee_components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './compnents/user_components/user-profile/user-profile.component';
import { UserloginComponent } from './compnents/login/userlogin/userlogin.component';
import { AdminLoginComponent } from './compnents/login/admin-login/admin-login.component';
import {MatSortModule} from "@angular/material/sort";
import { EditUserComponent } from './compnents/user_components/edit-user/edit-user.component';
import {HttpClientModule} from "@angular/common/http";
import { EditEmployeeComponent } from './compnents/employee_components/edit-employee/edit-employee.component';
import { CreateUserComponent } from './compnents/user_components/create-user/create-user.component';
import { CreateEmployeeComponent } from './compnents/employee_components/create-employee/create-employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {UserAddAccountFormComponent} from './compnents/employee_components/user-add-account-form/user-add-account-form.component';
import { FirmAddAccountFormComponent } from './compnents/firm_components/firm-add-account-form/firm-add-account-form.component';
import { UserControllComponent } from './compnents/employee_components/user-controll/user-controll.component';
import { FormAddFirmComponent } from './compnents/firm_components/form-add-firm/form-add-firm.component';
import { HomePageComponent } from './compnents/home-page/home-page.component';
import { BillComponent } from './compnents/transaction_components/bill/bill.component';
import { PayingComponent } from './compnents/transaction_components/paying/paying.component';
import { ExchangeComponent } from './compnents/menjacnica/exchange/exchange.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PopupTransactionComponent } from './compnents/transaction_components/popup-transaction/popup-transaction.component';
import { CreditListComponent } from './compnents/credit_components/credit-list/credit-list.component';
import { CreditRequestComponent } from './compnents/credit_components/credit-request/credit-request.component';
import { PaymentRecipientComponent } from './compnents/payment_recipient_components/payment-recipient/payment-recipient.component';
import { CreatePaymentRecipientComponent } from './compnents/payment_recipient_components/create-payment-recipient/create-payment-recipient.component';
import { EditPaymentRecipientComponent } from './compnents/payment_recipient_components/edit-payment-recipient/edit-payment-recipient.component';
import { CreditTransactionComponent } from './compnents/credit_components/credit-transaction/credit-transaction.component';
import { TransactionDetailsComponent } from './compnents/transaction_components/transaction-details/transaction-details.component';
import { CreditListUserComponent } from './compnents/credit_components/credit-list-user/credit-list-user.component';
import { OptionsComponent } from './compnents/listing_components/options/options.component';
import { ListingListComponent } from './compnents/listing_components/listing-list/listing-list.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { CardViewComponent } from './compnents/card_components/card-view/card-view.component';
import { FormatdatePipe } from './compnents/card_components/card-view/date-pipe/formatdate.pipe';
import { BankomatViewComponent } from './compnents/card_components/bankomat-view/bankomat-view.component';
import { BankomatViewCardComponent } from './compnents/card_components/bankomat-view-card/bankomat-view-card.component';
import { SupervisorListsingListComponent } from "./compnents/listing_components/supervisor-listsing-list/supervisor-listsing-list.component";
import {StockInfoComponent} from "./compnents/listing_components/stock-info/stock-info.component";
import {ChartComponent} from "./compnents/listing_components/chart/chart.component";
import {BuyHartijeComponent} from "./compnents/listing_components/buy-hartije/buy-hartije.component";
import {BuyHartijePopupComponent} from "./compnents/listing_components/buy-hartije-popup/buy-hartije-popup.component";
import {MyStocksComponent} from "./compnents/listing_components/my-stocks/my-stocks.component";
import {SellHartijeComponent} from "./compnents/listing_components/sell-hartije/sell-hartije.component";
import { SellHartijePopupComponent } from "./compnents/listing_components/sell-hartije-popup/sell-hartije-popup.component";
import {BuyFuturePopupComponent} from "./compnents/listing_components/sell-future-popup/buy-future-popup.component";
import {PaswordPopupComponent} from "./compnents/password_components/pasword-popup/pasword-popup.component";
import {ResetPasswordComponent} from "./compnents/password_components/reset-password/reset-password.component";
import {
  PasswordActivationComponent
} from "./compnents/password_components/password-activation/password-activation.component";
import {
  PasswordConfirmationComponent
} from "./compnents/password_components/reset-password/password-confirmation/password-confirmation.component";
import {RegisterCodeComponent} from "./compnents/password_components/register-code/register-code.component";
import { CompanyLoginComponent } from './compnents/login/company-login/company-login.component';
import { CompanyHomePageComponent } from './compnents/company-home-page/company-home-page.component';
import { OtcViewComponent } from './compnents/otc/otc-view/otc-view.component';
import { OtcBuyPopupComponent } from './compnents/otc/otc-buy-popup/otc-buy-popup.component';
import { SetStockVisibilityComponent } from './compnents/listing_components/set-stock-visibility/set-stock-visibility.component';
import { OtcCompanyViewComponent } from './compnents/otc/otc-company-view/otc-company-view.component';
import { OtcDeclinePopupComponent } from './compnents/otc/otc-decline-popup/otc-decline-popup.component';
import { OtcCompanyBuyPopupComponent } from './compnents/otc/otc-company-buy-popup/otc-company-buy-popup.component';
import { OtcAcceptDeclineComponent } from './compnents/otc/otc-accept-decline/otc-accept-decline.component';
import { ProfitTableComponent } from './compnents/profit-table/profit-table.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserloginComponent,
    AdminLoginComponent,
    RegisterCodeComponent,
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
    BuyFuturePopupComponent,
    PaswordPopupComponent,
    CompanyLoginComponent,
    CompanyHomePageComponent,
    OtcViewComponent,
    OtcBuyPopupComponent,
    SetStockVisibilityComponent,
    OtcCompanyViewComponent,
    OtcDeclinePopupComponent,
    OtcCompanyBuyPopupComponent,
    OtcAcceptDeclineComponent,
    ProfitTableComponent

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
