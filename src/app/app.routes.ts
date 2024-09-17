import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './admin/contact/contact.component';
import { AboutComponent } from './admin/about/about.component';
import { RoleComponent } from './admin/role/role.component';
import {QuizComponent} from './admin/quiz/quiz.component';
import { SelfAuditComponent } from './self-audit/self-audit.component';
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
      { path:'', redirectTo: '/dashboard', pathMatch: 'full' },
      {path:'', component:DashboardComponent},
      {path:'dashboard', component:DashboardComponent},


      {path:'', component:DashboardComponent},
      {path:'login', component:LoginComponent},
      {path:'lab_commission', component:LabCommissionComponent},
      {path:'self-check', component: SelfCheckComponent},
      {path:'self-audit', component: SelfAuditComponent},
      {path:'quiz', component: QuizComponent},
      {path:'contact', component:ContactComponent},
      {path:'about', component:AboutComponent},
      {path:'role', component:RoleComponent},
      {path:'software-tracking',component:SoftwareTrackingComponent},
      {path:'applications', component: ApplicationsComponent},
      {path:'lab-decommission', component: LabDecommissionComponent},
      {path:'audit', component: AuditComponent},


    ]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
