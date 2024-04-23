import {Component, OnInit} from '@angular/core';
import {Account, Currency, Employee, Role, User} from "../../../models/models";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import { MatSnackBar } from '@angular/material/snack-bar';
import {AccountService} from "../../../services/account.service";

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
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder,private accountService: AccountService, private route : ActivatedRoute,private router: Router, private snackBar: MatSnackBar) {
    this.accountForm = this.fb.group({
      accountType: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),


      })
    this.userId = 0;
    this.employeeId = 0;
    }

  save(){
    if (this.isSubmitting){
      console.log("Jedna forma je vec u procesu slanja!")
      return;
    }
    this.isSubmitting = true;
    this.account.accountType = this.accountForm.get('accountType')?.value;
    this.account.balance = this.accountForm.get('balance')?.value;
    this.account.mark = this.accountForm.get('mark')?.value;

    if(this.account.accountType == 'Tekuci'){
      this.accountService.saveAccount(this.userId, this.account.balance, "DINAR", this.employeeId, this.account.accountType)
      .subscribe(
        res => {
          console.log(res);
          this.openErrorSnackBar('Uspešno kreiran račun.');
        },
        error=>{
          this.openErrorSnackBar('Greška u kreiranju računa.');
        },
        () => {
          setTimeout( ()=> {
            this.isSubmitting = false;
          }, 3000);
        }
        );
    }else{
      this.accountService.saveAccount(this.userId, this.account.balance, this.account.mark, this.employeeId, this.account.accountType)
      .subscribe(
        res => {
          console.log(res);
          this.openErrorSnackBar('Uspešno kreiran račun.');
        },
        error=>{
          this.openErrorSnackBar('Greška u kreiranju računa.');
        },
        () => {
          setTimeout( ()=> {
            this.isSubmitting = false;
          }, 3000);
        }
        );
    }

  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
    })

    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.employeeId = tk.id;

    this.accountService.getAllCurrency().subscribe(res => {
      this.currencies = res.filter( curr => {
        return curr.mark !== 'RSD';
      })
      // this.currencies = res;
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
