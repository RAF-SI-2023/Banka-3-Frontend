import {Component, OnInit} from '@angular/core';
import {Account, Currency, Employee, Role, User} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add-account-form',
  templateUrl: './user-add-account-form.component.html',
  styleUrls: ['./user-add-account-form.component.css']
})
export class UserAddAccountFormComponent implements OnInit{

  account: Account = {} as Account
  currencies: Currency[] | null = null;
  userId: number;
  employeeId: number;
  accountForm: FormGroup

  constructor(private fb: FormBuilder,private userService: UserService, private route : ActivatedRoute,private router: Router, private snackBar: MatSnackBar) {
    this.accountForm = this.fb.group({
      accountType: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),


      })
    this.userId = 0;
    this.employeeId = 0;
    }

  save(){
    this.account.accountType = this.accountForm.get('accountType')?.value;
    this.account.balance = this.accountForm.get('balance')?.value;
    this.account.mark = this.accountForm.get('mark')?.value;

    if(this.account.accountType == 'Tekuci'){
      this.userService.saveAccount(this.userId, this.account.balance, "DINAR", this.employeeId, this.account.accountType)
      .subscribe(
        res => {
          console.log(res);
          this.openErrorSnackBar('Uspešno kreiran račun.');
        },
        error=>{
          this.openErrorSnackBar('Greška u kreiranju računa.');
        });
    }else{
      this.userService.saveForeignAccount(this.userId, this.account.balance, this.account.mark, this.employeeId)
      .subscribe(
        res => {
          console.log(res);
          this.openErrorSnackBar('Uspešno kreiran račun.');
        },
        error=>{
          this.openErrorSnackBar('Greška u kreiranju računa.');
        });
    }

  }


  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 2000, 
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
    })

    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.employeeId = tk.id;

    this.userService.getAllCurrency().subscribe(res => {
      this.currencies = res;
    });
  }

  get accountType(){
    return this.accountForm.get('accountType');
  }
  get balance(){
    return this.accountForm.get('balance');
  }
  get mark(){
    return this.accountForm.get('mark');
  }
}
