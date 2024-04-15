import {Component, OnInit} from '@angular/core';
import {Employee, Permission, Role} from "../models/models";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatLegacyNavList} from "@angular/material/legacy-list";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{

  employee = {} as Employee;
  dtEmployee: string = ''
  permissions: Permission[] | null = null;
  employeeForm: FormGroup;
  roles: Role[] | null = null;
  isSubmitting: boolean = false;


  constructor(private fb: FormBuilder, private userService: UserService, private router : Router, private snackBar: MatSnackBar) {
    this.employeeForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      jmbg: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^06\d{7,8}$/)]),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      isActive: new FormControl(true),
      role: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

   this.userService.getAllRoles().subscribe(res => {
     this.roles = res;
   })
  }

  save(){
    console.log("aaaaaaaaaaaaaaaa");
    if (this.isSubmitting){
      // console.log("Jedna forma je vec u procesu slanja!")
      return;
    }
    this.employee.firstName = this.employeeForm.get('firstName')?.value;
    this.employee.lastName = this.employeeForm.get('lastName')?.value;
    this.employee.username = this.employeeForm.get('username')?.value;
    this.employee.jmbg = this.employeeForm.get('jmbg')?.value;
    this.employee.gender = this.employeeForm.get('gender')?.value;
    this.employee.phoneNumber = this.employeeForm.get('phoneNumber')?.value;
    this.employee.address = this.employeeForm.get('address')?.value;
    this.employee.email = this.employeeForm.get('email')?.value;
    this.employee.isActive = this.employeeForm.get('isActive')?.value;
    // this.employee.role = this.employeeForm.get('role')?.value;

    // @ts-ignore
    let rId: number | undefined = this.roles?.find(role => role.roleName === this.employeeForm.get('role')?.value).roleId;
    this.employee.role = {
      roleId: rId,
      roleName : this.employeeForm.get('role')?.value
    }

    let dt = new Date(this.employeeForm.get('dateOfBirth')?.value).getTime();
    this.employee.dateOfBirth = dt;

    this.isSubmitting = true;

    this.userService.createEmployee(this.employee).subscribe(res => {
      console.log("usaooooooooooo");
      this.router.navigate(['user-list'])
    }, error => {
     this.openErrorSnackBar("Doslo je do greske kod kreiranja zaposlenog.")
    },
      () => {
        setTimeout( ()=> {
          this.isSubmitting = false;
          // console.log("Submitting setovan na false, moguce ponovno slanje.")
        }, 3000);
      }
      );
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 5,
    });
  }
  get firstName(){
    return this.employeeForm.get('firstName');
  }
  get lastName(){
    return this.employeeForm.get('lastName');
  }
  get username(){
    return this.employeeForm.get('username');
  }
  get jmbg(){
    return this.employeeForm.get('jmbg');
  }
  get dateOfBirth(){
    return this.employeeForm.get('dateOfBirth');
  }
  get gender(){
    return this.employeeForm.get('gender');
  }
  get phoneNumber(){
    return this.employeeForm.get('phoneNumber');
  }
  get address(){
    return this.employeeForm.get('address');
  }
  get email(){
    return this.employeeForm.get('email');
  }
  get isActive(){
    return this.employeeForm.get('isActive');
  }
  get role(){
    return this.employeeForm.get('role');
  }
}
