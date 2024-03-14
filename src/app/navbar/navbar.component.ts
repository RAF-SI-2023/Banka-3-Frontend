import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {
  }
  logout(){
    sessionStorage.removeItem("token")
    this.router.navigate(['user-login'])
      .then(()=> {
        window.location.reload()
      })
  }

}
