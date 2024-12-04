import { RouterModule, Routes } from '@angular/router';

import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './admin/contact/contact.component';
import { AboutComponent } from './admin/about/about.component';
import { RoleComponent } from './admin/role/role.component';
import { QuizComponent } from './admin/quiz/quiz.component';
import { SelfAuditComponent } from './self-audit/self-audit.component';
import { SoftwareTrackingComponent } from './components/software-tracking/software-tracking.component';
import { LabDecommissionComponent } from './components/lab-decommission/lab-decommission.component';
import { AuditComponent } from './components/audit/audit.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      //{path:'login', component:LoginComponent},
      { path: 'lab_commission', component: LabCommissionComponent },
      { path: 'self-check', component: SelfCheckComponent },
      { path: 'self-audit', component: SelfAuditComponent },
      { path: 'quiz', component: QuizComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'about', component: AboutComponent },
      { path: 'role', component: RoleComponent },
      { path: 'software-tracking', component: SoftwareTrackingComponent },
      { path: 'lab-decommission', component: LabDecommissionComponent },
      { path: 'audit', component: AuditComponent },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
