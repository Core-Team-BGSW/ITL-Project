import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from "./admin/sidebar/sidebar.component";
import { HomeComponent } from "./admin/home/home.component";
import { LabCommissionComponent } from "./components/lab_commission/lab_commission.component";
import {MatTabsModule} from '@angular/material/tabs';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogboxsubmitComponent } from './components/dialogboxsubmit/dialogboxsubmit.component';
import { ApplicationsComponent } from './components/applications/applications.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule,
      SidebarComponent, HomeComponent, RouterLink, LabCommissionComponent,MatTabsModule,SelfCheckComponent,ReactiveFormsModule,FormsModule,DialogboxsubmitComponent,
      ApplicationsComponent
    ]
})
export class AppComponent {
  title = 'Angular_app';
isOpen: any;
}
