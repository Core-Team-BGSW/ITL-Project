import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { ContactComponent } from "../contact/contact.component";
import { RoleComponent } from '../role/role.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ContactComponent, RoleComponent, DashboardComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) {}
  @Output() sidebarToggle = new EventEmitter<void>();
  @Input() isOpen: boolean = false; // Receive sidebar state

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
   //Logic for video and quiz popup
  onApplyForRoleClick(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default anchor behavior

    const confirmMessage = "You'll have to watch the video and take the quiz before applying for the role. Please, click on 'OK' to proceed";
    if (confirm(confirmMessage)) {
      // User clicked "OK"
      // Redirect to a specific section of the homepage, e.g., #video
      this.router.navigate(['/dashboard'], { fragment: 'target-section' });
      //window.location.hash = 'video'; // Navigate to the specific section
    } else {
      // User clicked "Cancel"
      // Do nothing or handle as needed
    }

}
isProfilePopupOpen = false;

  toggleProfilePopup(event: MouseEvent) {
    this.isProfilePopupOpen = !this.isProfilePopupOpen;
    event.stopPropagation(); // Prevent the click from bubbling up
  }

  closePopup(event: MouseEvent) {
    this.isProfilePopupOpen = false;
    event.stopPropagation(); // Prevent the click from bubbling up
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.isProfilePopupOpen) {
      this.closePopup(event);
    }
  }
}
