import {Component, OnInit} from '@angular/core';
import {Account, Employee} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-firm-add-account-form',
  templateUrl: './firm-add-account-form.component.html',
  styleUrls: ['./firm-add-account-form.component.css']
})
export class FirmAddAccountFormComponent implements OnInit {

  account = {} as Account
  firmForm: FormGroup
  userId: number;
  employeeId: number;

  constructor(private fb: FormBuilder, private userService: UserService, private route : ActivatedRoute) {
    this.firmForm = this.fb.group({
      accountType: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
    })
    this.userId = 0;
    this.employeeId = 0;
  }
  save(){
    this.account.accountType = this.firmForm.get('accountType')?.value;
    this.account.balance = this.firmForm.get('balance')?.value;
    this.account.mark = this.firmForm.get('mark')?.value;

    this.userService.saveCompanyAccount(this.userId, this.account.balance, this.account.mark, this.employeeId).subscribe(res => {
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
    })

    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1])) as Employee;
    this.employeeId = tk.employeeId;

  }

  get accountType(){
    return this.firmForm.get('accountType');
  }
  get balance(){
    return this.firmForm.get('balance');
  }
  get mark(){
    return this.firmForm.get('mark');
  }
}
