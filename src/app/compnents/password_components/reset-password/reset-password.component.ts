import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  emailForm = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email])
  })
    isUser = false;

    constructor(private userService : UserService, private route : ActivatedRoute, private router : Router, private snackBar: MatSnackBar) {}

    // iz rute vadi informaciju o tome da li je ulogovan user ili employee
  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>
      (params.get('type')?.includes('user')) ? this.isUser = true : this.isUser = false
      )
  }


  submit(){
    this.userService.resetPassword(String(this.email?.value),this.isUser).subscribe( res =>{
        this.openSuccessSnackBar("Uspesno ste resetovali sifru")
        console.log(res)
    }
    , error => {
        console.log(error)
        this.openSuccessSnackBar("Doslo je do greske kod resetovanje sifre.")
    });
  }

  goBack(){
    const path = this.isUser ? 'user' : 'admin'
    this.router.navigate([path + '-login']);
  }

  get email() {
    return  this.emailForm.get('emailControl');
  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
}
