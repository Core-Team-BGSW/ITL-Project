import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  constructor(private router: Router) { }

  navigateToTargetSection() {
    // Navigate to the route with a fragment identifier
    this.router.navigate(['/dashboard'], { fragment: 'target-section' });
  }
}
