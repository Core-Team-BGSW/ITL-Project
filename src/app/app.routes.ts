import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'lab_commission', component:LabCommissionComponent},
      {path:'self-check', component: SelfCheckComponent}
    ]
  },

];
