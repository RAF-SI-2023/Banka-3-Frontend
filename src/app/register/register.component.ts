import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = ''
  lastName: string= ''
  jmbg: string = ''
  user = {} as User;
  gender: string = ''
  phoneNumber: string = ''
  email: string = ''


  constructor(private userService : UserService) { }

  onSubmit(): void {
    this.userService.registerUser(this.firstName, this.lastName, this.jmbg,
      this.user.dateOfBirth.toString(), this.gender, this.phoneNumber, this.email).subscribe(res => {
      console.log(res)
    })

    console.log('Form submitted!');
  }
}
