import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {Contact} from "../../../models/models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-payment-recipient',
  templateUrl: './create-payment-recipient.component.html',
  styleUrls: ['./create-payment-recipient.component.css']
})
export class CreatePaymentRecipientComponent {

  contactData = {} as Contact;
  isSubmitting: boolean = false;

  contactForm = new FormGroup({
    formName: new FormControl('', [Validators.required]),
    formMyName: new FormControl('', [Validators.required]),
    formContact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
  })


  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {

  }
  saveContact() {
    if (this.isSubmitting){
      // console.log("Jedna forma je vec u procesu slanja!")
      return;
    }
    // this.contactData.id = 0;

    this.contactData.name = this.contactForm.get('formName')?.value as string;
    this.contactData.myName = this.contactForm.get('formMyName')?.value as string;
    this.contactData.accountNumber = this.contactForm.get('formContact')?.value as string;

    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      this.contactData.userId = decoded.id;
      this.userService.addContact(decoded.id,this.contactData).subscribe(data => {
          this.openSuccessSnackBar("Uspesno ste dodali novi kontakt")
        this.router.navigate(['/payment-recipients']);
      }, error => {
        this.openSuccessSnackBar("Doslo je do greske")
      },
        () => {
          setTimeout( ()=> {
            this.isSubmitting = false;
            // console.log("Submitting setovan na false, moguce ponovno slanje forme.")
          }, 3000);
        }
        );

    }
  }
  openSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
  cancel() {
    this.router.navigate(['/payment-recipients']);
  }
  get formName() {
    return this.contactForm.get('formName');
  }
  get formContact() {
    return this.contactForm.get('formContact');
  }
  get formMyName() {
    return this.contactForm.get('formMyName');
  }
}
