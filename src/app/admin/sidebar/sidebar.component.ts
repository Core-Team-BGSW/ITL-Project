import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  dropdownOpen: boolean = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Input() isOpen: boolean = false; // Receive sidebar state

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("home", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/homeicon1.svg"));
    this.matIconRegistry.addSvgIcon("menu", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/menu.svg"));
    this.matIconRegistry.addSvgIcon("cross", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/cross.svg"));
    this.matIconRegistry.addSvgIcon("addicon", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/plus.svg"));
    this.matIconRegistry.addSvgIcon("operation", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/operationicon.svg"));
    this.matIconRegistry.addSvgIcon("arrow", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/arrow1.svg"));
    this.matIconRegistry.addSvgIcon("deleteicon", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/deleteicon.svg"));

  }
  get toggleIcon() {
    return this.isOpen ? 'cross' : 'menu';
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle the sidebar state
    this.sidebarToggle.emit(); // Emit the event
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  menuItemClicked(item: string) {
    console.log(`Clicked on ${item}`);
    this.dropdownOpen = false; // Close the dropdown after clicking an item
  }
}
