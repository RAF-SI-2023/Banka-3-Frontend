import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule
    RegisterComponent,
    RegisterCodeComponent,
    RegisterPasswordComponent
    UserProfileComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
