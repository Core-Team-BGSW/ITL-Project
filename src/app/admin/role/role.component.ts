import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, private loginService: LoginService) {}

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
}
