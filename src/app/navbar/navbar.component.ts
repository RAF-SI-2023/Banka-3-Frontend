import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {
  }
  userProfile(){
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.router.navigate(['user-profile', tk.id])
      // .then(()=> {
      //   window.location.reload()
      // })

  }
  logout(){
    sessionStorage.removeItem("token")
    this.router.navigate(['user-login'])
      .then(()=> {
        window.location.reload()
      })
  }

}
