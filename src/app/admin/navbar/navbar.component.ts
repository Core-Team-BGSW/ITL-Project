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
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private domSanitizer: DomSanitizer, private router: Router, private dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon("user", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/user.svg"));
    this.matIconRegistry.addSvgIcon("boschname", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/boschname.svg"));
    this.matIconRegistry.addSvgIcon("boschlogo", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/bosch.svg"));
  }
   //Logic for video and quiz popup
   onApplyForRoleClick(event: MouseEvent): void {
    event.preventDefault(); // Prevent default anchor behavior

    // Open the custom confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    // Handle the dialog result (OK or Skip)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // User clicked "OK"
        this.router.navigate(['/dashboard'], { fragment: 'target-section' }).then(() => {
          this.scrollToVideo();
        });
      } else {
        // User clicked "Skip"
        this.router.navigate(['/role']);
      }
    });
  }

  private scrollToVideo() {
    const element = document.getElementById('video-section');
    if (element) {
      // Scroll to the element with a smooth scrolling effect
      element.scrollIntoView({ behavior: 'smooth' });
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
