import {Component, OnInit} from '@angular/core';
import { MOCK_RECIPIENTS} from "./mock-recipients";
import {Contact} from "../models/models";
import {UserService} from "../services/user.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-payment-recipient',
  templateUrl: './payment-recipient.component.html',
  styleUrls: ['./payment-recipient.component.css']
})
export class PaymentRecipientComponent implements OnInit{
  //TODO: Potrebno zameniti MOCK_RECIPIENTS u html-u kada se odradi bek
  // protected readonly MOCK_RECIPIENTS = MOCK_RECIPIENTS;
  recipients: Contact[] = []
  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
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
    console.log(contactId);
    const token = sessionStorage.getItem("token");
    if (token){
      const  decoded : any = jwtDecode(token);
      this.userService.deleteUsersContact(contactId).subscribe( data => {
        this.userService.getUsersContactsById(decoded.id).subscribe( res => {
          this.recipients = res;
        })
      });
    } else {
      this.openSuccessSnackBar("Doslo je do greske pri prisanju")
    }
  }
  editContact(contact: Contact) {

    this.router.navigate([`/edit-payment-recipient/${contact.id}`], { state: { contact } });
  }
  openSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
}
