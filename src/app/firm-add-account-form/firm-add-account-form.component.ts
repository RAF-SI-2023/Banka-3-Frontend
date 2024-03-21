import {Component, OnInit} from '@angular/core';
import {Account} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-firm-add-account-form',
  templateUrl: './firm-add-account-form.component.html',
  styleUrls: ['./firm-add-account-form.component.css']
})
export class FirmAddAccountFormComponent implements OnInit {

  account = {} as Account

  constructor(private userService: UserService, private route : ActivatedRoute) {
    this.account.account = '';
    this.account.balance = 0;
    this.account.mark = '';

  }

  save(){

  }
  ngOnInit(): void {
  }


}
