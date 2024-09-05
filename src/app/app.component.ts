import { Component, InjectionToken } from '@angular/core';
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
import { LabDecommissionComponent } from './components/lab-decommission/lab-decommission.component';
import { MatListModule } from "@angular/material/list";
import { DialogdecommissionComponent } from './lab-decommission/dialogdecommission/dialogdecommission.component';
import { AuditComponent } from './components/audit/audit.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './admin/login/login.component';









@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule,
      SidebarComponent, HomeComponent, RouterLink, LabCommissionComponent,MatTabsModule,SelfCheckComponent,ReactiveFormsModule,FormsModule,DialogboxsubmitComponent,
      ApplicationsComponent, LabDecommissionComponent,ReactiveFormsModule,MatListModule,DialogdecommissionComponent,
      AuditComponent,ToastrModule, LoginComponent
    ]

})
export class AppComponent {
  title = 'Angular_app';
isOpen: any;




}
