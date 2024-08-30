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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,MatCardModule, MatInputModule, FormsModule , ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toastr : ToastrService, private service : AuthserviceService, private router: Router, private dataservice : DataService){



  }
  registerform = this.builder.group({

    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    //name :this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregisteration(){
    if(this.registerform.valid){
      this.service.Proceedregister( this.registerform.value).subscribe(res =>{
        this.toastr.success('registered successfully')
        this.router.navigate(['login'])
      });

    }else{
      this.toastr.warning("Please enter valid data");
    }
  }

}
