import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { SoftwareTrackingComponent } from './components/software-tracking/software-tracking.component';

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'lab_commission', component:LabCommissionComponent},
      {path:'self-check', component: SelfCheckComponent},
      {path:'software-track',component:SoftwareTrackingComponent}
    ]
  },

];
