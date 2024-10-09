import { Component } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { ContactComponent } from "../contact/contact.component";
import { RoleComponent } from '../role/role.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ContactComponent, RoleComponent, DashboardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onApplyForRoleClick(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default anchor behavior

    const confirmMessage = "Please watch the video and take the quiz before applying for the role.";
    if (confirm(confirmMessage)) {
      // User clicked "OK"
      // Redirect to a specific section of the homepage, e.g., #video
      this.router.navigate(['/dashboard'], { fragment: 'target-section' });
      window.location.hash = 'video'; // Navigate to the specific section
    } else {
      // User clicked "Cancel"
      // Do nothing or handle as needed
    }

}
}
