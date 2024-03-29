import {Component, OnInit} from '@angular/core';
import { MOCK_RECIPIENTS} from "./mock-recipients";
import {Contact} from "../models/models";
import {UserService} from "../services/user.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment-recipient',
  templateUrl: './payment-recipient.component.html',
  styleUrls: ['./payment-recipient.component.css']
})
export class PaymentRecipientComponent implements OnInit{
  //TODO: Potrebno zameniti MOCK_RECIPIENTS u html-u kada se odradi bek
  protected readonly MOCK_RECIPIENTS = MOCK_RECIPIENTS;
  recipients: Contact[] = []
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userService.getUsersContactsById(decoded.id).subscribe( data => {
        this.recipients = data;
      });
    }
  }

  deleteContact(contactId: number){
    //Pozvati deleteUsersContact iz userService-a
    const token = sessionStorage.getItem("token");
    if (token){
      const  decoded : any = jwtDecode(token);
      this.userService.deleteUsersContact(decoded.id, contactId).subscribe( data => {
        this.userService.getUsersContactsById(decoded.id).subscribe( res => {
          this.recipients = res;
        })
      });
    } else {
      alert("Greska pri brisanju.");
    }
  }
  editContact(contact: Contact) {

    this.router.navigate([`/edit-payment-recipient/${contact.contactId}`], { state: { contact } });
  }
}
