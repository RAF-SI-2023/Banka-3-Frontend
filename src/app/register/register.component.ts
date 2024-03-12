import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  ime: string = '';
  prezime: string = '';
  jmbg: number = 0;
  jmbgPlaceholder: string = 'JMBG';
  email: string = '';
  datumRodjenja: number = 0;
  datumRodjenjaPlaceholder: string = 'Datum rodjenja';
  pol: string = '';
  adresa: string = '';
  telefon: string = '';

  constructor() { }

  onSubmit(): void {
    console.log('Form submitted!');
  }
}
