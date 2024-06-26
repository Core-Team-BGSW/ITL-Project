import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'lab_commission', component:LabCommissionComponent},
    ]
  },

];
