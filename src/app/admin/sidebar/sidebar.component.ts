import { AfterViewInit, Component } from '@angular/core';
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
export class SidebarComponent{
  isOpen = false;


  dropdownOpen: boolean = false;
  dropdownItems = [
    { name: 'Annual Self Check', link: '/self-check', icon:'fas fa-tachometer-alt'},
    { name: 'Software Tracking', link: '/software-track', icon:'fas fa-tachometer-alt' },
    { name: 'ACL IP Management', link: '/acl-ip-management', icon:'fas fa-tachometer-alt' },
    { name: 'Audit', link: '/audit', icon:'fas fa-tachometer-alt' },
    { name: 'Lab Movement', link: '/lab-movement', icon:'fas fa-tachometer-alt' },
  ];
  menuItemClicked(item: string) {
    console.log(`Clicked on ${item}`);
    // Implement your logic here
    // Optionally close the dropdown after clicking an item
    this.dropdownOpen = false; // Close the dropdown
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
// Search functionality
searchTerm: string = ''; // Ensure this line exists
navItems = [
  { name: 'Dashboard', link: '/dashboard', icon:'fas fa-tachometer-alt' },
  { name: 'Lab Commission', link: '/lab_commission', icon:'fa-solid fa-plus' },
  { name: 'Lab Decommission', link: '/lab-decommission', icon:'fa-solid fa-file-zipper' },
];

get filteredNavItems() {
  return this.navItems.filter(item =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

}
