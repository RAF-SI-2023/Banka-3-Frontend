import {Component, OnInit} from '@angular/core';
import {User} from "../models/models";
import {UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  user: User | null = null;
  constructor(private userService: UserService, private route : ActivatedRoute) {
  }


  save(){
    this.userService.saveUser(this.user).subscribe(res => {
      console.log(res)
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      console.log(userId)
      this.userService.getUserById(userId).subscribe(res => {
        this.user = res
      });
    });
  }

}
