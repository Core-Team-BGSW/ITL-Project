import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [DashboardComponent, CommonModule, FormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  username = '';
  ntid: any = '';
  department: any = '';

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getuserid();
  }

  navigateToTargetSection() {
    // Navigate to the route with a fragment identifier
    this.router.navigate(['/dashboard'], { fragment: 'target-section' });
  }

  getuserid() {

    this.username = (this.loginService.getUserId())?.split('(')[0].trim();
    this.ntid = (this.loginService.getNtId())?.toUpperCase();
    this.department=this.loginService.getUserId()?.match(/\(([^)]+)\)/)?.[1];
  }
   // User Information
  //  username = '';
  //  ntid = '';
  //  department = '';
  entity = '';
  role = '';

  // Lab Details
  labDetails = [
    {
      location: '',
      building: '',
      lab_no: ''
    }
  ];



  // Add new lab details
  addLab() {
    this.labDetails.push({ location: '', building: '', lab_no: '' });
  }

  // Remove a specific lab detail row
  removeLab(index: number) {
    this.labDetails.splice(index, 1);
  }

  // Submit form logic
  submitForm() {
    const newUser = {
      NTId: this.ntid,
      name: this.username,
      department: this.department,
      entityName: this.entity,
      role: this.role,
      labDetails: this.labDetails // Pass the lab details as an array
    };

    this.http.post('http://localhost:8080/api/users', newUser).subscribe(
      (response: any) => {
        console.log('User created successfully', response);
      },
      (error: any) => {
        console.error('Error creating user', error);
      }
    );
  }
}
