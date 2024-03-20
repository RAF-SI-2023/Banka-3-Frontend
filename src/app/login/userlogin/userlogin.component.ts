import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  codeActivate: boolean = false;
  showCheckAddress: boolean = true;
  address: string = '';

  checkEmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  passwordForm = new FormGroup({
    activationCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(32),Validators.pattern(/^(?=.*\d.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)]),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private router: Router) {
  }

  //  Proverava da li postoji korisnik sa datim mejlom
  checkAddr() {
    this.showCheckAddress = false;
    if(this.email?.valid){
    this.userService.checkEmail(this.emailCheck?.value)
      .subscribe(response => {
        this.codeActivate = response.codeActivate;
        this.address = response.email;
      }, error => {
        console.error('Error occurred:', error);
      });

  }}


  createUser() {
    if (this.newPassword?.value !== this.confirmPassword?.value) {
      console.error('Passwords do not match');
      return;
    }

    this.userService.setPassword(this.address, Number(this.activationCode?.value), this.newPassword?.value,this.confirmPassword?.value)
      .subscribe(response => {
        // Handle response as needed
      }, error => {
        console.error('Error occurred:', error);
      });
    this.codeActivate = true;
  }

  submitLogin() {
    if(this.email?.valid && this.password?.valid){
      let email = this.loginForm.get("email")?.value
      let password = this.loginForm.get("password")?.value
      console.log(email, password)
      this.userService.loginUser(email, password).subscribe(res => {
        sessionStorage.setItem("token", res.token);
        this.router.navigate(['home-page'])
          .then(()=> {
            window.location.reload()
          })
      })
    }
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
