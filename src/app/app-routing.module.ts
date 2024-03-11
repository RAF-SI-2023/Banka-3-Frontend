import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

import { RegisterComponent } from './register/register.component';
import { RegisterCodeComponent } from './register-code/register-code.component';
import { RegisterPasswordComponent} from './register-password/register-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'register/code', component: RegisterCodeComponent },
  { path: 'register/password', component: RegisterPasswordComponent },
  { path: 'user-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
