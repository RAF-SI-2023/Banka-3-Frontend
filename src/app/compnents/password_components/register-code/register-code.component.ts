import { Component } from '@angular/core';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.css']
})
export class RegisterCodeComponent {
  code: number = 0;
  constructor() { }

  onSubmit(): void {
    console.log('Form submitted!');
  }
}
