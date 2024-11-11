import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { ContactComponent } from "../contact/contact.component";
import { RoleComponent } from '../role/role.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ContactComponent, RoleComponent, DashboardComponent, FormsModule, FontAwesomeModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  @Output() sidebarToggle = new EventEmitter<void>();
  @Input() isOpen: boolean = false; // Receive sidebar state

  toggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle the sidebar state
    this.sidebarToggle.emit();
  }
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private router: Router
  ) {
    this.matIconRegistry.addSvgIcon("user", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/user.svg"));
    this.matIconRegistry.addSvgIcon("boschname", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/boschname.svg"));
    this.matIconRegistry.addSvgIcon("boschlogo", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/bosch.svg"));
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
