import {Component, OnInit} from '@angular/core';
import {Firm, FirmCreateDto} from "../../../models/models";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-form-add-firm',
  templateUrl: './form-add-firm.component.html',
  styleUrls: ['./form-add-firm.component.css']
})
export class FormAddFirmComponent{

  firm = {} as FirmCreateDto;
  firmForm: FormGroup;


  constructor(private accountService : AccountService, private fb: FormBuilder, private router : Router) {
    this.firmForm = this.fb.group({
      firmName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^06\d{7,8}$/)]),
      matNumberFirm: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
      pib: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
      industryCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
      isActive: new FormControl(true),
    })
  }
  save(){
    this.firm.title = this.firmForm.get('firmName')?.value;
    this.firm.email = this.firmForm.get('email')?.value;
    this.firm.number = this.firmForm.get('phoneNumber')?.value;
    this.firm.maticniBroj = this.firmForm.get('matNumberFirm')?.value;
    this.firm.pib = this.firmForm.get('pib')?.value;
    this.firm.sifraDelatnosti = this.firmForm.get('industryCode')?.value;
    this.accountService.createFirm(this.firm).subscribe(res => {
      this.firm = res;
      this.router.navigate(['user-control']);
      console.log(res);

    })

   // this.userService.createEmployee(this.firm).subscribe(res => {
   //    console.log(res)
   //    this.router.navigate(['user-control'])
   //  });

  }
  get firmName(){
    return this.firmForm.get('firmName');
  }
  get email(){
    return this.firmForm.get('email');
  }
  get phoneNumber(){
    return this.firmForm.get('phoneNumber');
  }
  get matNumberFirm(){
    return this.firmForm.get('matNumberFirm');
  }
  get pib(){
    return this.firmForm.get('pib');
  }
  get industryCode(){
    return this.firmForm.get('industryCode');
  }
  get isActive(){
    return this.firmForm.get('isActive');
  }

}
