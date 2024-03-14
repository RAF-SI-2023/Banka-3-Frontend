import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/models";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  isPopupVisible: boolean = false;
  name :string = 'Pera';
  surname:string = 'Peric';
  gender:string = 'Muški';
  phone:string= '123456789';
  addr:string= 'Adresa 15';
  email:string= 'pperic@gmail.com';
  birthDate:string = '1/1/2000';
  accountList: string[] = ['555-534535-545', '555-534535-545', '555-534535-545', '555-534535-545']

  user = {} as User
  roleName : string = ''

  constructor(private service: UserService, private route : ActivatedRoute) {
  }


  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      console.log(userId)
      this.service.getUserById(userId).subscribe(res => {
        this.user = res
      });
    });
  }

}
