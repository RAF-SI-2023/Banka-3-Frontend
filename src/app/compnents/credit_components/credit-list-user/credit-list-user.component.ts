import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountDto, Credit, User} from "../../../models/models";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {AccountService} from "../../../services/account.service";
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
  currUserId = 0;

  constructor(private router: Router, private userService: UserService, private accountService: AccountService) {

  }

  creditRequest(){
    this.router.navigate(['/credit-request']);

  }

  creditDetails(credit: Credit){
    this.router.navigate(['/credit-details']);
  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.currUserId = tk.id
    this.accountService.getAllCreditsByUserId(tk.id).subscribe(res => {
      this.credits = res;
      console.log(res)

    });
  }
}

