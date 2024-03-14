import { Component } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = ''
  lastName: string= ''
  jmbg: string = ''
  dateOfBirth: string = ''
  gender: string = ''
  phoneNumber: string = ''
  email: string = ''


  constructor(private userService : UserService) { }

  onSubmit(): void {
    this.userService.registerUser(this.firstName, this.lastName, this.jmbg,
      this.dateOfBirth, this.gender, this.phoneNumber, this.email).subscribe(res => {
      console.log(res)

    })

    console.log('Form submitted!');
  }
}
