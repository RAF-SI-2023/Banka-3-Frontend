import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  isSubmitting = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  submitLogin() {
    if(this.isSubmitting) {
      // console.log("Jedna forma je vec u procesu slanja!")
      return;
    }
    if(this.email?.valid && this.password?.valid){
      this.isSubmitting = true
      let email = this.loginForm.get("email")?.value
      let password = this.loginForm.get("password")?.value
      console.log(email, password)
      this.userService.loginEmployee(email, password).subscribe(
        res => {
          sessionStorage.setItem("token", res.token);
          let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
          if(tk.role === 'ROLE_ADMIN')
            this.router.navigate(['user-list'])
            .then(()=> {
              window.location.reload()
            })
          if(tk.role === 'ROLE_BANKING_OFFICER')
            this.router.navigate(['user-control'])
              .then(()=> {
                window.location.reload()
              })
          if(tk.role === 'ROLE_CREDIT_OFFICER')
            this.router.navigate(['credit-list'])
              .then(()=> {
                window.location.reload()
              })
          if(tk.role === 'ROLE_SUPERVISOR')
            this.router.navigate(['supervisor-listing'])
              .then(()=> {
                window.location.reload()
              })
          if(tk.role === 'ROLE_AGENT')
            this.router.navigate(['listing-list'])
              .then(()=> {
                window.location.reload()
              })
        },
        error => {
          this.openErrorSnackBar('Pogrešan email ili lozinka.');
          this.isSubmitting = false
        },
        () => {
          setTimeout( ()=> {
            this.isSubmitting = false;
            // console.log("Submitting setovan na false, moguce ponovno slanje forme.")
          }, 3000);
        }
        )
    }
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
