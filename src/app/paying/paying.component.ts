import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Account, AccountDto, TransactionDto} from "../models/models";
import {UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../services/account.service";
import {PopupTransactionComponent} from "../popup/popup-transaction/popup-transaction.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-paying',
  templateUrl: './paying.component.html',
  styleUrls: ['./paying.component.css']
})
export class PayingComponent implements OnInit {

  accountNumber: string = '';
  accountType: string = '';
  accountBalance: number = 0;
  accountMark: string = '';
  transactionId: number = 0;

  accountNumberPattern: RegExp = /^\d{16}$/;
  recipientAccountControl: FormControl = new FormControl();
  account = {} as AccountDto;

  paymentCodes: number[] = [];

  transaction: TransactionDto = {} as TransactionDto;
  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,private accountService: AccountService,private userService: UserService, private router: Router, private http: HttpClient) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.account = navigation.extras.state['account'];
    }
    this.groupForm = this.formBuilder.group({
      recipientName: new FormControl('', Validators.required),
      referenceNumber: new FormControl('', Validators.required),
      recipientAccount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
      paymentPurpose: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      selectedPaymentCode: new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {

    this.selectedAccount = history.state.account;
    //console.log(this.selectedAccount);

      //todo account number ide preko getAll
      if (this.selectedAccount) {
        this.accountNumber = this.selectedAccount.accountNumber;
        this.accountBalance = this.selectedAccount.availableBalance - this.selectedAccount.reservedAmount;
        //this.accountMark = this.selectedAccount.currency;
      }

    for (let i: number = 120; i <= 290; i++) {
      this.paymentCodes.push(i);
    }
  }

  //todo currency, account Number
  onSubmit() {
    if (this.groupForm && this.groupForm.valid) {
      if (this.groupForm.get('amount')?.value > this.accountBalance) {

        alert('Nemate dovoljno sredstava na računu za izvršenje ove transakcije.');

      } else {
        this.startTransaction();
      }
    } else {
      alert("Fields not filled correctly.")
    }
  }

  startTransaction():void {
    //todo fali dto
    //this.transaction.currencyMark = this.account;
    this.transaction.accountFrom = this.accountNumber;
    this.transaction.sifraPlacanja = this.groupForm.get('selectedPaymentCode')?.value;
    this.transaction.amount = this.groupForm.get('amount')?.value;
    this.transaction.pozivNaBroj = this.groupForm.get('referenceNumber')?.value;
    this.transaction.accountTo = this.groupForm.get('recipientAccount')?.value;
    this.transaction.currencyMark = this.selectedAccount.currency.mark
    this.accountService.sendTransaction(this.transaction).subscribe(
      (response) => {
          this.transactionId = response
            this.dialog.open(PopupTransactionComponent,{
              data: { inputValue: this.transactionId }
            });

        // this.router.navigate(['/validateTransaction'], {state: {transactionId : this.transactionId }});
      },
      (error) => {
        console.error('Nemate dovoljno sredstava:', error);
        alert('Nemate dovoljno sredstava');
      }
    );
  }

  formatRecipientAccount(value: string): void {
    let cleanValue = value.replace(/-/g, '').replace(/\D/g, '');
    let formattedValue = '';

    for (let i = 0; i < cleanValue.length; i++) {
      if (i === 3 || i === 13) {
        formattedValue += '-';
      }
      formattedValue += cleanValue[i];
    }

  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.groupForm?.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }
  selectedAccount: any;

  get recipientName() {
    return this.groupForm.get('recipientName');
  }
  get recipientAccount() {
    return this.groupForm.get('recipientAccount');
  }

  get referenceNumber() {
    return this.groupForm.get('referenceNumber');
  }

  get paymentPurpose(){
    return this.groupForm.get('paymentPurpose');
  }

  get amount(){
    return this.groupForm.get('amount');
  }
}
