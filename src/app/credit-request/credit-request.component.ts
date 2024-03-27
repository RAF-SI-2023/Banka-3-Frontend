import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {

  formGroup!: FormGroup;
  userId: string = 'user123';
  userAccounts: any[] = [];
  account: any;
  selectedCurrency: string = 'EUR';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.preloadUserAccounts();
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      creditType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      repaymentPeriod: ['', Validators.required],
      employed: [false],
      monthlySalary: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
      employmentDate: ['', Validators.required],
      creditPurpose: ['', Validators.required],
      userId: [this.userId]
    });


    this.formGroup.controls['amount'].setAsyncValidators(async (control: AbstractControl) => {
      return new Promise<ValidationErrors | null>(resolve => {
        setTimeout(() => {
          if (control.value && isNaN(control.value.replace(',', '.'))) {
            resolve({ 'invalidNumber': true });
          } else {
            resolve(null);
          }
        }, 500);
      });
    });

    this.formGroup.controls['accountNumber'].valueChanges.subscribe(selectedAccountNumber => {
      const selectedAccount = this.userAccounts.find(account => account.accountNumber === selectedAccountNumber);
      if (selectedAccount) {
        this.selectedCurrency = selectedAccount.currency;
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      console.log(formData);
      this.formGroup.reset();
      this.router.navigate(['/credit-list']);
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }
  updateSelectedCurrency(event: any): void {
    const selectedAccountNumber = event.target.value;
    const selectedAccount = this.userAccounts.find(account => account.accountNumber === selectedAccountNumber);
    if (selectedAccount) {
      this.selectedCurrency = selectedAccount.currency;
    }
  }


  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  preloadUserAccounts(): void {
    this.userAccounts = [
      { accountNumber: '1234567890', accountName: 'Savings Account', currency: 'EUR' },
      { accountNumber: '0987654321', accountName: 'Checking Account', currency: 'USD' },
    ];
  }
}