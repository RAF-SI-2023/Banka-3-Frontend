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


  contactForm = new FormGroup({
    formName: new FormControl('', [Validators.required]),
    formMyName: new FormControl('', [Validators.required]),
    formContact: new FormControl('', [Validators.required]),
  })

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    //@ts-ignore
    this.contactId = this.route.snapshot.paramMap.get('contactId');
    const token = sessionStorage.getItem("token");
    if (token){
      const decoded: any = jwtDecode(token)
      this.userId = decoded.id
      this.userService.getUsersContactByContactId(decoded.id, this.contactId).subscribe( data => {
        this.contactForm.get('formName')?.setValue(data.name);
        this.contactForm.get('formMyName')?.setValue(data.myName);
        this.contactForm.get('formContact')?.setValue(data.accountNumber);
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
    //Nije testirano jer nemaju gotov bek, proveriti

    // @ts-ignore
    this.userService.editContact(this.userId, this.contactId, this.formName, this.formMyName, this.formContact).subscribe( data => {
      this.router.navigate(['/payment-recipient'])
    })
  }
  delete() {
    this.userService.deleteUsersContact(this.userId, this.contactId).subscribe( data => {
      this.router.navigate(['/payment-recipient'])
    })
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

