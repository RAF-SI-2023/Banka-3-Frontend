import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {Account, AccountDto} from "../../../models/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit{

  // selectedAccount1= {} as AccountDto;
  // selectedAccount2= {} as AccountDto;
  accounts = [] as AccountDto[]

  form = new FormGroup({
    selectedAccount1: new FormControl('', Validators.required),
    selectedAccount2: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  })

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getAccountsByUserId(tk.id).subscribe( res => {
      this.accounts = res
    })
  }

  onConvert(): void {
    let acc1 = this.form.get('selectedAccount1')?.value
    let acc2 = this.form.get('selectedAccount2')?.value
    let a = this.form.get('amount')?.value
    let amount= 0
    if(a !== null && a !== undefined){
      amount = parseInt(a)
    }
    console.log(acc1)
    console.log(acc2)
    this.accountService.sendCurrencyExchange({accountFrom: acc1!, accountTo: acc2!, amount: amount }).subscribe(res => {
      console.log(res)
    })
  }



  get selectedAccount1() {
    return this.form.get('selectedAccount1');
  }
  get selectedAccount2() {
    return this.form.get('selectedAccount2');
  }
  get amount() {
    return this.form.get('selectedAccount2');
  }
}
