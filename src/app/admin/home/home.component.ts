import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet, RouterLink} from '@angular/router';
import { ContactComponent } from "../contact/contact.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, SidebarComponent, RouterOutlet, RouterLink, ContactComponent, CommonModule, MatCardModule]
})
export class HomeComponent {
// showModal: any;
// toggleModal() {
// throw new Error('Method not implemented.');
// }
toggleProperty = true;
toggle() {
  this.toggleProperty = !this.toggleProperty;
}

}
