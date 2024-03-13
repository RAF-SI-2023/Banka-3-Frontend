import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appName';
  isLoggedIn : boolean

  constructor() {
    this.isLoggedIn = false;
  }

  setLoggedIn(value : boolean){
    this.isLoggedIn = value;
  }

  getLoggedIn(){
    return this.isLoggedIn;
  }
}
