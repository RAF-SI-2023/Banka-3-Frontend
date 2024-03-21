import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.css']
})
export class PasswordConfirmationComponent implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
  passwordForm: FormGroup;
  code: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Kreiramo formu direktno koristeći FormGroup i FormControl
    this.passwordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$")
      ]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });

    this.code = '';
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
  }

  // Validator za proveru da li se lozinke podudaraju
  passwordMatchValidator: (control: AbstractControl) => ValidationErrors | null = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true } : null;
  };

  submit(): void {
    if (this.passwordForm.valid) {
      const newPassword = this.passwordForm.get('password')?.value;
      this.userService.resetPassword(this.code, newPassword).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }

  }
}
