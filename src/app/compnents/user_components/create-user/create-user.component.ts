import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee, User} from "../../../models/models";
import { UserService } from "../../../services/user.service";
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: User = {} as User;
  dtUser: string = '';
  userForm: FormGroup;
  isSubmitting = false


  constructor(private fb: FormBuilder,private userService: UserService, private router: Router, private snackBar: MatSnackBar) {

      this.userForm = this.fb.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        jmbg: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
        dateOfBirth: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [Validators.required ,Validators.minLength(9), Validators.pattern(/^06\d{7,8}$/)]),
        address: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        isActive: new FormControl(true),
      })
  }
  save() {

    this.user.firstName = this.userForm.get('firstName')?.value;
    this.user.lastName = this.userForm.get('lastName')?.value;
    this.user.jmbg = this.userForm.get('jmbg')?.value;
    this.user.gender = this.userForm.get('gender')?.value;
    this.user.phoneNumber = this.userForm.get('phoneNumber')?.value;
    this.user.address = this.userForm.get('address')?.value;
    this.user.email = this.userForm.get('email')?.value;
    this.user.isActive = this.userForm.get('isActive')?.value;

    let dt = new Date(this.userForm.get('dateOfBirth')?.value).getTime();
    this.user.dateOfBirth = dt;

    this.isSubmitting = true;
    this.userService.createUser(this.user).subscribe(res => {
      this.user = res;
      console.log(res);
      let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
      this.openErrorSnackBar("Uspeno kreiran korisnik")
      if(tk.role === "ROLE_ADMIN"){
        this.router.navigate(['user-list']);
      }
      if(tk.role === "ROLE_BAKING_OFFICER"){
        this.router.navigate(['user-control']);
      }
    }, error => {
        this.openErrorSnackBar("Doslo je do greske kod kreiranja korisnika.")
      },
      () => {
        setTimeout( ()=> {
          this.isSubmitting = false;
          // console.log("Submitting setovan na false, moguce ponovno slanje.")
        }, 3000);
      }
    );
  }


  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
  get firstName(){
    return this.userForm.get('firstName');
  }
  get lastName(){
    return this.userForm.get('lastName');
  }
  get jmbg(){
    return this.userForm.get('jmbg');
  }
  get dateOfBirth(){
    return this.userForm.get('dateOfBirth');
  }
  get gender(){
    return this.userForm.get('gender');
  }
  get phoneNumber(){
    return this.userForm.get('phoneNumber');
  }
  get address(){
    return this.userForm.get('address');
  }
  get email(){
    return this.userForm.get('email');
  }
  get isActive(){
    return this.userForm.get('isActive');
  }


}
