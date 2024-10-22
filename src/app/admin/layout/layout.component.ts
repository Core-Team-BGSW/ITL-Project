import { Component, EventEmitter, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { RoleComponent } from '../role/role.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, SidebarComponent, RouterOutlet, RouterLink, ContactComponent, CommonModule, MatCardModule, RoleComponent, NavbarComponent, MatListModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

  @Output() sidebarToggle = new EventEmitter<void>();
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit();
  }

  constructor() {}
}
