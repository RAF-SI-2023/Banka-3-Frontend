import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-password-activation',
  templateUrl: './password-activation.component.html',
  styleUrls: ['./password-activation.component.css']
})
export class PasswordActivationComponent implements OnInit{
  passwordForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
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
   * @param controlName
   * @param matchingControlName
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
    //TODO: Pripremiti sta ce se slati u body-u (password) za sledeci zahtev: POST: /api/v1/employee/setPassword?identifier=******
    console.log("Sifra1: " + this.passwordForm.get('password')?.value);
    console.log("Sifra2: " + this.passwordForm.get('confirmPassword')?.value);
  }

}
