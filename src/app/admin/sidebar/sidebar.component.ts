import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isOpen = false;
  isDropdownOpen = false;



  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
// Search functionality
searchTerm: string = ''; // Ensure this line exists
navItems = [
  { name: 'Dashboard', link: '/dashboard', icon:'fas fa-tachometer-alt' },
  { name: 'Lab Commission', link: '/lab_commission', icon:'fa-solid fa-plus' },
  { name: 'Self Check', link: '/self-check', icon:'fa-solid fa-list-check' },
  { name: 'Lab Decommission', link: '/lab-decommission', icon:'fa-solid fa-file-zipper' },
];

get filteredNavItems() {
  return this.navItems.filter(item =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

}
