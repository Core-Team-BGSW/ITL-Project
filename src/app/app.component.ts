import { Component, InjectionToken } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarComponent } from "./admin/sidebar/sidebar.component";
import { LabCommissionComponent } from "./components/lab_commission/lab_commission.component";
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
import { LayoutComponent } from './admin/layout/layout.component';
import { SelfAuditComponent } from './self-audit/self-audit.component';
import { AngularModule } from './angularmodule/angularmodule.module';
import { NavbarComponent } from "./admin/navbar/navbar.component";









@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,
    SidebarComponent, LayoutComponent, RouterLink, LabCommissionComponent, SelfCheckComponent, ReactiveFormsModule, FormsModule, DialogboxsubmitComponent,
    ApplicationsComponent, LabDecommissionComponent, ReactiveFormsModule, MatListModule, DialogdecommissionComponent,
    AuditComponent, ToastrModule, LoginComponent, SelfAuditComponent, AngularModule, NavbarComponent]

})
export class AppComponent {
  title = 'Angular_app';
isOpen: any;




}
