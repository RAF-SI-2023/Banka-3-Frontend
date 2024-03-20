import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paying',
  templateUrl: './paying.component.html',
  styleUrls: ['./paying.component.css']
})
export class PayingComponent implements OnInit {

  recipientAccount: string = '';
  accountNumber: string = '';
  paymentCodes: number[] = [];
  selectedPaymentCode: number = 1; 
  accountNumberPattern: RegExp = /^[0-9]{3}-[0-9]{13}-[0-9]{2}$/;
  recipientAccountControl: FormControl = new FormControl();
  account:any;

  formGroup = new FormGroup({
      recipientName: new FormControl('', Validators.required),
      referenceNumber: new FormControl('', Validators.required),
      recipientAccount: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}[0-9]{13}[0-9]{2}')]),
      paymentPurpose: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      selectedPaymentCode: new FormControl('', Validators.required),
  })

  constructor(private formBuilder: FormBuilder, private router: Router) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.account = navigation.extras.state['account'];
    }
  }




  ngOnInit(): void {
    for (let i = 120; i <= 290; i++) {
      this.paymentCodes.push(i);
    }

    // this.route.params.subscribe(params => {
    //   this.accountNumber = params['accountNumber'];
    // });

  
  }

  isRecipientAccountValid(): boolean {
    return this.accountNumberPattern.test(this.recipientAccount);
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
    
    this.recipientAccount = formattedValue;
  }
  


  onSubmit(): void {
    if (this.formGroup && this.formGroup.valid) {
      // Call to the backend
    } else {
      alert("Fields not filled correctly.")
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.formGroup?.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  
  get recipientName() {
    return this.formGroup.get('recipientName');
  }
  
  get referenceNumber() {
    return this.formGroup.get('referenceNumber');
  }
  
  get paymentPurpose(){
    return this.formGroup.get('paymentPurpose');
  }
  
  get amount(){
    return this.formGroup.get('amount');
  }
  
  
}
