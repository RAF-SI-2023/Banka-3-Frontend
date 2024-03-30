import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {UserActivationDto} from "../../models/models";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  codeActivate: boolean = false;
  showCheckAddress: boolean = true;
  userActivationDto = {} as UserActivationDto
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

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  //  Proverava da li postoji korisnik sa datim mejlom
  checkAddr() {
    // this.showCheckAddress = false;
    this.userService.checkEmail(this.emailCheck?.value)
      .subscribe(response => {
        this.userActivationDto = response;
        this.codeActivate = this.userActivationDto.active
        this.address = this.userActivationDto.email
        this.showCheckAddress = false;
      }, error => {
        console.error('Error occurred:', error);
      });
  }


  createPassword() {
    if (this.newPassword?.value !== this.confirmPassword?.value) {
      console.error('Passwords do not match');
      return;
    }

    this.userService.setPassword(this.address, Number(this.activationCode?.value), this.newPassword?.value)
      .subscribe(response => {
        // Handle response as needed
        this.codeActivate = false;
        this.showCheckAddress = false;
        console.log(response)
      }, error => {
        console.error('Error occurred:', error);
      });
  }

  submitLogin() {
    if(this.email?.valid && this.password?.valid){
      let email = this.loginForm.get("email")?.value
      let password = this.loginForm.get("password")?.value
      console.log(email, password)
      this.userService.loginUser(email, password).subscribe(
        res => {
          sessionStorage.setItem("token", res.token);
          this.router.navigate([''])
            .then(()=> {
              window.location.reload()
            })
        },
        error => {
          this.openErrorSnackBar('Pogrešan email ili lozinka.');
        })
    }
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 0, 
    });
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
