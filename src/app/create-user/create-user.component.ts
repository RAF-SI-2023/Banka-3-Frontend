import { Component } from '@angular/core';
import {User} from "../models/models";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  user = {} as User;
  dtUser : string = ''
  constructor(private userService: UserService) {

  }


  save(){
    let dt = new Date(this.dtUser).getDate()
    this.user.dateOfBirth = dt;
    this.userService.createUser(this.user).subscribe(res => {
      console.log(res)
    })
  }

}
