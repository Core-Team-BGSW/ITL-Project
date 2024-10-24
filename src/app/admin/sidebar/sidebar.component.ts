import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faCogs, faTachometerAlt, faPlus, faFileZipper, fas } from '@fortawesome/free-solid-svg-icons';

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
    FormsModule,
    FontAwesomeModule,

  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent{

  faBars = faBars;
  faSearch = faSearch;
  faCogs = faCogs;
  faTachometerAlt=faTachometerAlt;
  fas=fas;
  faPlus=faPlus


  dropdownOpen: boolean = false;

  menuItemClicked(item: string) {
    console.log(`Clicked on ${item}`);
    // Implement your logic here
    // Optionally close the dropdown after clicking an item
    this.dropdownOpen = false; // Close the dropdown
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @Output() sidebarToggle = new EventEmitter<void>();
@Input() isOpen: boolean = false; // Receive sidebar state

toggleSidebar() {
  this.isOpen = !this.isOpen; // Toggle the sidebar state
  this.sidebarToggle.emit(); // Emit the event
}
// Search functionality
searchTerm: string = ''; // Ensure this line exists
navItems = [
  { name: 'Dashboard', link: '/dashboard', icon:'fas fa-tachometer-alt' },
  { name: 'Lab Commission', link: '/lab_commission', icon:'fa-solid fa-plus' },
  { name: 'Lab Decommission', link: '/lab-decommission', icon:'fa-solid fa-file-zipper' },
];
dropdownItems = [
    { name: 'Annual Self Check', link: '/self-check', icon:'fas fa-tachometer-alt'},
    { name: 'Software Tracking', link: '/software-track', icon:'fas fa-tachometer-alt' },
    { name: 'ACL IP Management', link: '/acl-ip-management', icon:'fas fa-tachometer-alt' },
    { name: 'Audit', link: '/audit', icon:'fas fa-tachometer-alt' },
    { name: 'Lab Movement', link: '/lab-movement', icon:'fas fa-tachometer-alt' },
  ];
  hasDropdownItemsInFilter(): boolean {
    return this.filteredNavItems.some(item => this.dropdownItems.includes(item));
  }
get filteredNavItems() {
  const allItems = [...this.navItems, ...this.dropdownItems]; // Combine both lists
  return allItems.filter(item =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}
