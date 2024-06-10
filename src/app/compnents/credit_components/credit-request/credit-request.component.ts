import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {CreditRequestCreateDto} from '../../../models/models';
import {AccountService} from "../../../services/account.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {

  formGroup!: FormGroup;
  userId: string = '';
  userAccounts: any[] = [];
  selectedCurrency: string = 'RSD';
  isSubmitting: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private accountService: AccountService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.userId = tk.id
    this.preloadUserAccounts();
    this.initializeForm();
  }

  updateSelectedCurrency(event: any): void {
    const selectedAccountNumber = event.target.value;
    const selectedAccount = this.userAccounts.find(account => account.accountNumber === selectedAccountNumber);
    if (selectedAccount) {
      this.selectedCurrency = selectedAccount.currency.mark;
    }
  }


  initializeForm(): void {

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      accountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      applianceReason: ['', Validators.required],
      employed: [false],
      dateOfEmployment: ['', Validators.required],
      paymentPeriod: ['', Validators.required],
      currencyMark: [this.selectedCurrency],
      userId: [this.userId]
    });
  }

  onSubmit(): void {
    if (this.isSubmitting){
      return;
    }
    if (this.formGroup.valid) {
      this.isSubmitting = true;
      let creditRequest = {} as CreditRequestCreateDto
      creditRequest.currencyMark = this.formGroup.get("currencyMark")?.value
      creditRequest.name = this.formGroup.get("name")?.value
      creditRequest.accountNumber = this.formGroup.get("accountNumber")?.value
      creditRequest.amount = this.formGroup.get("amount")?.value
      creditRequest.userId = this.formGroup.get("userId")?.value
      creditRequest.paymentPeriod = this.formGroup.get("paymentPeriod")?.value
      creditRequest.applianceReason = this.formGroup.get("applianceReason")?.value
      creditRequest.employed = this.formGroup.get("employed")?.value
      let dt = this.formGroup.get("dateOfEmployment")?.value
      creditRequest.dateOfEmployment = new Date(dt).getTime()

      console.log(creditRequest)
      this.accountService.sendCreditRequest(creditRequest).subscribe(
        response => {

          this.openErrorSnackBar("Uspesno poslat zahtev za kredit")
          console.log("Credit request sent successfully:", response);
          this.router.navigate(['/'])
          this.isSubmitting = false;
        },
        error => {
          this.openErrorSnackBar("Doslo je do greske kod slanja zahteva za kredit")
          console.error("Error sending credit request:", error);
          this.isSubmitting = false;
        },
        () => {
          setTimeout( ()=> {
            this.isSubmitting = false;
          }, 3000);
        }
      );
    } else {
      this.openErrorSnackBar("Pogresno ste popunili polja")
    }
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
  //TODO Zameni mock podatke, sa pravim
  // preloadUserAccounts(): void {
  //   this.userAccounts = [
  //     { accountNumber: '1234567890', accountName: 'Savings Account', currency: 'EUR' },
  //     { accountNumber: '0987654321', accountName: 'Checking Account', currency: 'USD' },
  //   ];
  // }
  preloadUserAccounts(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getAccountsByUserId(tk.id).subscribe(
      accounts => {
        this.userAccounts = accounts;
        if (this.userAccounts.length > 0) {
          this.selectedCurrency = this.userAccounts[0].currency.mark;
        }
      },
      error => {
        console.error("Error loading user accounts:", error);
      }
    );
  }
}
