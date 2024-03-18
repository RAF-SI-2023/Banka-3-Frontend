import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  codeActivate: boolean = false;
  showCheckAddress: boolean = true;

  checkEmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  passwordForm = new FormGroup({
    activationCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })


  //  Proverava da li postoji korisnik sa datim mejlom
  checkAddr() {

  this.showCheckAddress = false;
  }


  // Kreira usera sa datom adresom i vraca ga nazad na login
  createUser() {

  }

  submitLogin() {

  }

  get email() {
    return this.loginForm.get('email');
  }
  get emailCheck(){
    return this.checkEmailForm.get('email')
  }

  get password() {
    return this.loginForm.get('password');
  }
  get activationCode() {
    return this.passwordForm.get('activationCode');
  }
  get newPassword() {
    return this.passwordForm.get('password');
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword')
  }
}
