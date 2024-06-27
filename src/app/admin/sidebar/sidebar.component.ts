import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, SidebarComponent, MatButtonModule, MatIconModule, MatToolbarModule, RouterLink,MatMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItemClicked(item: string) {
    console.log(`Clicked on ${item}`);
    // Implement your logic here
  }

}
