import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { AppComponent } from '../../app.component';




interface FormData {
  region: string;
  country: string;
  location: string;
  locationCode: string;
  entity: string;
  GB: string;
  localITL: string;
  localITLProxy: string;
  KAM: string;
  department: string;
  building: string;
  floor: string;
  labNo: string;
  primaryCoordinator: string;
  costCenter: string;
  kindOfLab: string;
  purposeOfLab: string;
  brief: string;
  ACLRequired: boolean;
  CMDBRequired: boolean;
  greenPorts?: number;
  yellowPorts?: number;
  redPorts?: number;
}



@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule,LabCommissionComponent,AppComponent],
  templateUrl: './dialogboxsubmit.component.html',
  styleUrl: './dialogboxsubmit.component.scss'
})
export class DialogboxsubmitComponent {

  submittedForms: FormData[] = [];


  formData: FormData = {
  region: '',
  country: '',
  location: '',
  locationCode: '',
  entity: '',
  GB: '',
  localITL: '',
  localITLProxy: '',
  KAM: '',
  department: '',
  building: '',
  floor: '',
  labNo: '',
  primaryCoordinator: '',
  costCenter: '',
  kindOfLab: '',
  purposeOfLab: '',
  brief: '',
  ACLRequired: false,
  CMDBRequired: false
};

}
