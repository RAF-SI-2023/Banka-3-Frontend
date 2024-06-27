import {Component, OnInit} from '@angular/core';
import {Account, Employee} from "../../../models/models";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {AccountService} from "../../../services/account.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-firm-add-account-form',
  templateUrl: './firm-add-account-form.component.html',
  styleUrls: ['./firm-add-account-form.component.css']
})
export class FirmAddAccountFormComponent implements OnInit {

  account = {} as Account
  bankParticipations: String[] = ["10", "20", "30", "40", "50"]
  firmForm: FormGroup
  companyId: number;
  employeeId: number;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private accountService: AccountService, private route : ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    this.firmForm = this.fb.group({
      accountType: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
      initialMargin: new FormControl('', Validators.required),
      maintenanceMargin: new FormControl('', Validators.required),
      bankParticipations: new FormControl('', Validators.required)
    })
    this.companyId = 0;
    this.employeeId = 0;
  }
  save(){
    this.account.accountType = this.firmForm.get('accountType')?.value;
    this.account.availableBalance = this.firmForm.get('balance')?.value;
    this.account.mark = this.firmForm.get('mark')?.value;

    if(this.account.accountType == 'Tekuci'){
      this.accountService.saveCompanyAccount(this.companyId, this.account.availableBalance, "RSD", this.employeeId, "DINARSKI")
        .subscribe(
          res => {
            console.log(res);
            this.openErrorSnackBar('Uspešno kreiran račun.');
            this.router.navigate(['user-control'])
          },
          error=>{
            this.openErrorSnackBar('Greška u kreiranju računa.');
            this.router.navigate(['user-control'])
          },
          () => {
            setTimeout( ()=> {
              this.isSubmitting = false;
            }, 3000);
          }
        );
    }else if(this.account.accountType == 'Marzni'){
      this.accountService.saveMarginAccountFirm(this.employeeId, this.companyId, this.account.availableBalance, this.account.initialMargine, this.account.maitenanceMargine, this.account.bankParticipation, "MARZNI")
        .subscribe(
          res => {
            console.log(res);
            this.openErrorSnackBar('Uspešno kreiran račun.');
            this.router.navigate(['user-control'])
          },
          error=>{
            this.openErrorSnackBar('Greška u kreiranju računa.');
            this.router.navigate(['user-control'])
          },
          () => {
            setTimeout( ()=> {
              this.isSubmitting = false;
            }, 3000);
          }
        );
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.companyId = Number(params.get('firmId'));
    })

    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    // console.log(tk)
    this.employeeId = tk.id;

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

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
}
