import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Contact} from "../models/models";
import { ActivatedRoute } from '@angular/router';
import {jwtDecode} from "jwt-decode";


@Component({
  selector: 'app-edit-payment-recipient',
  templateUrl: './edit-payment-recipient.component.html',
  styleUrls: ['./edit-payment-recipient.component.css']
})
export class EditPaymentRecipientComponent {

  contactId: number;
  userId: number = 0
  contacts: Contact[] = [];
  contactData = {} as Contact;



  contactForm = new FormGroup({
    formName: new FormControl('', [Validators.required]),
    formMyName: new FormControl('', [Validators.required]),
    formContact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),

  })

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    //@ts-ignore
    this.contactId = parseInt(this.route.snapshot.paramMap.get('contactId') || '0');
    const token = sessionStorage.getItem("token");
    if (token){
      const decoded: any = jwtDecode(token)
      this.userId = decoded.id
      this.userService.getUsersContactsById(this.userId).subscribe( data => {
        console.log(data)
        this.contacts = data;

        const contact = this.contacts.find(contact => contact.id === this.contactId);

        if (contact) {
          this.contactForm.patchValue({
            formName: contact.name,
            formMyName: contact.myName,
            formContact: contact.accountNumber
          });
        }
      })
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const contactString = params['contact'];
      if (contactString) {
        const contact: Contact = JSON.parse(contactString);
        console.log(contact);
        // this.contactForm.get('formName')?.setValue(contact.name);
        // this.contactForm.get('formContact')?.setValue(contact.accountNumber);
      }
    });
  }


  saveContact() {
    // Save contact to database

    this.contactData.name = this.contactForm.get('formName')?.value as string;
    this.contactData.myName = this.contactForm.get('formMyName')?.value as string;
    this.contactData.accountNumber = this.contactForm.get('formContact')?.value as string;

    // @ts-ignore
    this.userService.editContact(this.contactData, this.contactId)
    .subscribe( 
      data => {
        this.router.navigate(['/payment-recipients'])
    })
  }
  delete() {
    this.userService.deleteUsersContact(this.contactId).subscribe( data => {
      this.router.navigate(['/payment-recipients'])
    })
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

