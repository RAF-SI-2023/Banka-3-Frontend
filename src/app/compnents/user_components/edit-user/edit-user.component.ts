import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/models";
import {UserService} from "../../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  user: User | null = null;
  constructor(private userService: UserService, private route : ActivatedRoute, private router: Router) {
  }


  save(){
    this.userService.saveUser(this.user).subscribe(res => {
      console.log(res)
    })
  }

  ngOnInit(): void {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.route.paramMap.subscribe(params => {
      const userId = Number(params.get('id'));
      console.log(userId)
      this.userService.getUserById(userId).subscribe(res => {
        this.user = res
        if(tk.role === 'ROLE_ADMIN'){
          this.router.navigate(['user-list'])
        }
        if(tk.role === 'ROLE_BANKING_OFFICER'){
          this.router.navigate(['user-control'])
        }
      });
    });
  }
}
