import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CreditRequestCreateDto } from '../models/models';
import {AccountService} from "../services/account.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {

  formGroup!: FormGroup;
  userId: string = 'user123';
  userAccounts: any[] = [];
  selectedCurrency: string = 'EUR';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private accountService: AccountService) {}

  ngOnInit(): void {
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
      monthlyPaycheck: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      employed: [false],
      dateOfEmployment: ['', Validators.required],
      paymentPeriod: ['', Validators.required],
      currencyMark: ['EUR'],
      userId: [this.userId]
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const creditRequestData: CreditRequestCreateDto = this.formGroup.value;
      this.userService.sendCreditRequest(creditRequestData).subscribe(
        response => {
          alert("Credit request sent successfully");
          console.log("Credit request sent successfully:", response);
        },
        error => {
          alert("Failed to send credit request");
          console.error("Error sending credit request:", error);
        }
      );
    } else {
      console.error("Form is not valid. Please fill in all required fields.");
    }
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
