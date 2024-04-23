import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-activation',
  templateUrl: './password-activation.component.html',
  styleUrls: ['./password-activation.component.css']
})
export class PasswordActivationComponent implements OnInit{
  passwordForm: FormGroup;
  code: string;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
    // Dohvatanje parametra 'code' iz URL-a
    //@ts-ignore
    this.code = this.route.snapshot.paramMap.get('code');
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f(){
    return this.passwordForm.controls;
  }
  ngOnInit() {
    // Pretplata na promene u 'password' polju
    this.passwordForm.get('password')?.valueChanges.subscribe(() => {
      // Forsira ponovnu validaciju 'confirmPassword' polja
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  /**
   * Validator za password:
   * - minimum 8 karaktera, maksimum 32, najmanje 1 veliko i 1 malo slovo, minimum 2 cifre
   * @param control
   */
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // ne raditi validaciju nad praznom vrednoscu
    }
    const hasEnoughLength = value.length >= 8 && value.length <= 32;
    const hasTwoDigits = (value.match(/\d/g) || []).length >= 2;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    if (hasEnoughLength && hasTwoDigits && hasUpperCase && hasLowerCase) {
      return null;
    }
    return {
      passwordInvalid: true
    };
  }

  /**
   * Funkcija koja ce proveriti da li se lozinke iz polja password i confirmPassword poklapaju,
   * posto je odradjena validacija za password, ovo je dovoljno za confirmPassword jer trebaju biti isti.
   * @param controlName prvi password
   * @param matchingControlName ponovljeni password
   * @constructor
   */
  MustMatch(controlName: string, matchingControlName: string){
    return (passwordForm: FormGroup) => {
      const control = passwordForm.controls[controlName]
      const matchingControl = passwordForm.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors['MustMatch']){
        return
      }
      if (control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch: true})
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }

  /**
   * Metoda onSubmit se poziva prilikom klika na button 'Kreiraj sifru' ukoliko su ispunjeni svi uslovi validacije,
   * klikom na button 'Kreiraj sifru' uzimamo iz linka path parametar i saljemo u payload password kao json,
   * u slucaju uspesno postavljene sifre zaposlenog redirectujemo na 'EmployeeView' stranicu.
   */
  onSubmit(){
    // console.log("Sifra1: " + this.passwordForm.get('password')?.value);
    // console.log("Sifra2: " + this.passwordForm.get('confirmPassword')?.value);
    // console.log("Identifier: " + this.code);
    this.userService.setEmployeePassword(this.code, this.passwordForm.get('password')?.value).subscribe( data => {
      console.log("Poslat POST zahtev, potreban redirect na sledecu stranicu.");
      if ( data === 'Password successfully changed'){
        this.openSuccessSnackBar("Uspesno postavljena nova sifra!")
        this.router.navigate(['/admin-login']); //Potrebno promeniti kada se napravi employee-view
      } else {
        this.openSuccessSnackBar("Neuspesno postavljanje sifre. Proverite mail i pokusajte opet.")
      }
    })
  }

  openSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }
}
