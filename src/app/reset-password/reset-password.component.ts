import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  emailForm = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email])
  })
    isUser = false;
  
    constructor(private userService : UserService, private route : ActivatedRoute, private router : Router) {
    }
  ngOnInit(): void {
    this.route.paramMap.subscribe( params => 
      (params.get('type')?.includes('user')) ? this.isUser = true : this.isUser = false
      )
  }
  

  submit(){
    this.userService.resetPassword(String(this.email?.value),this.isUser).subscribe( res =>
      console.log('res', res));
  }

  goBack(){
    const c = this.isUser ? 'user' : 'admin'
    this.router.navigate([c + '-login']);
  }

  get email() {
    return  this.emailForm.get('emailControl');
  }

}
