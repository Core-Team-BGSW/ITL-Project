import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../../services/authservice.service';
//import { Router } from 'express';
import { Router } from '@angular/router'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; //

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,MatCardModule, MatInputModule, FormsModule , ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerform: FormGroup;

  constructor(private builder: FormBuilder, private toastr : ToastrService, private service : AuthserviceService, private router: Router, private dataservice : DataService, private snackBar: MatSnackBar,){
    this.registerform = this.builder.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    });



  }
  // registerform = this.builder.group({

  //   id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
  //   //name :this.builder.control('', Validators.required),
  //   password: this.builder.control('', Validators.required),
  //   role: this.builder.control(''),
  //   isactive: this.builder.control(false)
  // });

  // proceedregisteration(){
  //   if(this.registerform.valid){
  //     this.service.Proceedregister( this.registerform.value).subscribe(res =>{
  //       this.toastr.success('registered successfully')
  //       this.router.navigate(['login'])
  //     });

  //   }else{
  //     this.toastr.warning("Please enter valid data");
  //   }
  // }

  // proceedregistration(): void {
  //   if (this.registerform.valid) {
  //     this.service.Proceedregister(this.registerform.value).subscribe({
  //       next: (response) => {
  //         this.toastr.success('Registered successfully');
  //         this.router.navigate(['login']);
  //       },
  //       error: (error) => {
  //         console.error('Registration error:', error);
  //         this.toastr.error('Registration failed. Please try again.');
  //       }
  //     });
  //   } else {
  //     this.toastr.warning('Please enter valid data');
  //   }
  // }
  proceedregistration(): void {
    if (this.registerform.valid) {
      this.service.registerUser(this.registerform.value).subscribe(
        response => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

}
