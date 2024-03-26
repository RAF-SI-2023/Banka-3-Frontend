import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Contact} from "../models/models";
import { ActivatedRoute } from '@angular/router';
import {jwtDecode} from "jwt-decode/build/esm";

@Component({
  selector: 'app-edit-payment-recipient',
  templateUrl: './edit-payment-recipient.component.html',
  styleUrls: ['./edit-payment-recipient.component.css']
})
export class EditPaymentRecipientComponent {


  contactForm = new FormGroup({
    formName: new FormControl('', [Validators.required]),
    formMyName: new FormControl('', [Validators.required]),
    formContact: new FormControl('', [Validators.required]),
  })

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const contactString = params['contact'];
      if (contactString) {
        const contact: Contact = JSON.parse(contactString);
        console.log(contact);
        this.contactForm.get('formName')?.setValue(contact.name);
        this.contactForm.get('formContact')?.setValue(contact.accountNumber);
      }
    });
  }


  saveContact() {
    // Save contact to database
  }
  delete() {

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

