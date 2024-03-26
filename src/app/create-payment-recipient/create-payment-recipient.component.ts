import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {Contact} from "../models/models";

@Component({
  selector: 'app-create-payment-recipient',
  templateUrl: './create-payment-recipient.component.html',
  styleUrls: ['./create-payment-recipient.component.css']
})
export class CreatePaymentRecipientComponent {

  contactData = {} as Contact;

  contactForm = new FormGroup({
    formName: new FormControl('', [Validators.required]),
    formMyName: new FormControl('', [Validators.required]),
    formContact: new FormControl('', [Validators.required]),
  })


  constructor(private userService: UserService, private router: Router) {

  }
  saveContact() {
    this.contactData.name = this.contactForm.get('formName')?.value as string;
    this.contactData.myName = this.contactForm.get('formMyName')?.value as string;
    this.contactData.accountNumber = this.contactForm.get('formContact')?.value as string;

    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userService.addContact(decoded.id,this.contactData).subscribe(data => {
        this.router.navigate(['/payment-recipients']);
      }, error => {
        alert("Greska pri dodavanju.");
      });

    }
  }
  cancel() {
    this.router.navigate(['/payment-recipients']);
  }
  get formName() {
    return this.contactForm.get('FormName');
  }
  get formContact() {
    return this.contactForm.get('FormContact');
  }
  get formMyName() {
    return this.contactForm.get('FormMyName');
  }
}
