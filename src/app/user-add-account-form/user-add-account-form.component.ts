import {Component, OnInit} from '@angular/core';
import {Account, Employee, Role, User} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-add-account-form',
  templateUrl: './user-add-account-form.component.html',
  styleUrls: ['./user-add-account-form.component.css']
})
export class UserAddAccountFormComponent implements OnInit{

  account = {} as Account
  currencies: Account[] | null = null;
  user = {} as User
  employee = {} as Employee
  userForm: FormGroup


  constructor(private fb: FormBuilder,private userService: UserService, private route : ActivatedRoute) {
    this.userForm = this.fb.group({
      account: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
    })
  }
  save(){

    this.account.account = this.userForm.get('account')?.value;
    this.account.balance = this.userForm.get('balance')?.value;
    this.account.mark = this.userForm.get('mark')?.value;

  }
  ngOnInit(): void {

    this.userService.getAllCurrency().subscribe(res => {
      this.currencies = res;
    });

    //this.route.paramMap.subscribe(params => {
      //   const userId = +params.get('userId');
      //   const employeeId = +params.get('employeeId');
      //
      //   if (userId) {
      //     this.userService.getUserById(userId).subscribe(res => {
      //       this.user = res;
      //     });
      //   }
      //
      //   if (employeeId) {
      //     this.userService.getEmployeeById(employeeId).subscribe(res => {
      //       this.employee = res;
      //     });
      //   }
      // });
  }
}
