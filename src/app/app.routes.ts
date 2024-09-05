import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './admin/register/register.component';
import { ContactComponent } from './admin/contact/contact.component';
import { AboutComponent } from './admin/about/about.component';


import { SoftwareTrackingComponent } from './components/software-tracking/software-tracking.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { LabDecommissionComponent } from './components/lab-decommission/lab-decommission.component';
import { AuditComponent } from './components/audit/audit.component';
import { LoginComponent } from './admin/login/login.component';



export const routes: Routes = [

  {


    path:'',
    component:HomeComponent,
    children:[
      {path:'', component:DashboardComponent},
      {path:'dashboard', component:DashboardComponent},


      {path:'', component:DashboardComponent},
      {path:'login', component:LoginComponent},
      {path:'lab_commission', component:LabCommissionComponent},
      {path:'self-check', component: SelfCheckComponent},

      {path:'register', component:RegisterComponent},
      {path:'contact', component:ContactComponent},
      {path:'about', component:AboutComponent},
      {path:'software-tracking',component:SoftwareTrackingComponent},
      {path:'applications', component: ApplicationsComponent},
      {path:'lab-decommission', component: LabDecommissionComponent},
      {path:'audit', component: AuditComponent},


    ]
  },

];
