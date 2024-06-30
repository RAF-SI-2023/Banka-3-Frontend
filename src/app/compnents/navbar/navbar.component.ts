import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  isEmployeeUser = false
  isCompany = false
  isBank = false
  id = 0
  email = ''
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // const token = sessionStorage.getItem("token");
    // if (token) {
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   this.email = payload.email
    //   console.log(this.email)
    //   console.log(this.id)
    //   console.log(this.id)
    // }
    this.isEmployeeUser = this.isEmployee();
    this.isCompany = this.isCompanyCheck()
    this.isBank = this.isBankCheck()
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
  isEmployee(): boolean {
    const token = sessionStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.id = payload.id
      this.email = payload.sub
      if(payload.role && payload.role !== "ROLE_COMPANY"){
        console.log('Employee: true')
        return true
      }
    }
    console.log('Employee: false')
    return false;
  }

  isCompanyCheck(){
    const token = sessionStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.id = payload.id
      this.email = payload.sub
      if(payload.role && payload.role === "ROLE_COMPANY"){
        console.log('Company: true')
        return true
      }
    }
    console.log('Company: false')
    return false;
  }
  isBankCheck(){
    const token = sessionStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.id = payload.id
      this.email = payload.sub
      if (payload.role && payload.role !== "ROLE_COMPANY"){
        return false;
      }
      if(!("role" in payload)){
        console.log("User")
        return true;
      }
      if(payload.role && payload.role === "ROLE_COMPANY" && payload.id !== 1){
        console.log('Bank: true')
        return true;
      }
    }
    console.log('Bank: false')
    return false;
  }

}

