import { Component, InjectionToken } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsComponent } from './components/applications/applications.component';
import { LabDecommissionComponent } from './components/lab-decommission/lab-decommission.component';
import { AuditComponent } from './components/audit/audit.component';
import { SelfAuditComponent } from './self-audit/self-audit.component';
import { AngularModule } from './angularmodule/angularmodule.module';
import { LayoutComponent } from './admin/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    SelfCheckComponent,
    ReactiveFormsModule,
    FormsModule,
    ApplicationsComponent,
    LabDecommissionComponent,
    ReactiveFormsModule,
    AuditComponent,
    SelfAuditComponent,
    AngularModule,
    LayoutComponent,
  ],
})
export class AppComponent {
  title = 'Angular_app';
  isOpen: any;
}
