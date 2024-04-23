import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountDto, Credit, User} from "../../../models/models";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {AccountService} from "../../../services/account.service";
import {CreditService} from "../../../services/credit.service";
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-credit-list-user',
  templateUrl: './credit-list-user.component.html',
  styleUrls: ['./credit-list-user.component.css']
})
export class CreditListUserComponent implements OnInit{
  currUser = {} as User;
  credits: Credit[] = [];

  constructor(private router: Router, private userService: UserService, private accountService: AccountService, private creditService: CreditService) {

  }

  creditRequest(){
    this.router.navigate(['/credit-request']);

  }

  creditDetails(credit: Credit){
    this.router.navigate(['/credit-details']);
  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.userService.getUserById(tk.id).subscribe(res => {
      this.currUser = res;

      this.creditService.getAllCreditsByUserId(this.currUser.userId).subscribe(res => {
        this.credits = res;

      });
    });
  }
}

