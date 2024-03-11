import { Component } from '@angular/core';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css']
})
export class RegisterPasswordComponent {
  password: string = '';
  passwordRepeat: string = '';

  onSubmit(): void {
    console.log('Form submitted!');
  }
}
