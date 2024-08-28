import { CommonModule } from '@angular/common';
import { Component, Input, Inject, Output, EventEmitter  } from '@angular/core';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { AppComponent } from '../../app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs
//import { DataService } from '../../data.service';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule,LabCommissionComponent,AppComponent,MatDialogModule,MatInputModule,],
  templateUrl: './dialogboxsubmit.component.html',
  styleUrl: './dialogboxsubmit.component.scss'
})

export class DialogboxsubmitComponent {
  //@Input() data: any;

  @Output() formDataSubmitted = new EventEmitter<any>();

  region: string;
  country:string;
  location:string;
  locationcode:string;
  entity:string;
  GB:string;
  localITL:string;
  localITLproxy:string;
  DH:string;
  KAM:string;
  Dept:string;
  Building:string;
  Floor:string;
  labno:string;
  primarylabco:string;
  secondarylabco:string;
  CC:string;
  kindoflab:string;
  purposeoflab:string;
  ACL:string;
  greenports:string;
  yellowports:string;
  redports:string;
  cmdbradio:string;
  sharedlabradio:string;
  ACLradio:string;
  otherLabType:string;
  description:string;







  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogboxsubmitComponent>, private http: HttpClient) {
    this.region = data.region;
    this.country=data.country
    this.location=data.location
    this.locationcode=data.locationcode
    this.entity=data.entity
    this.GB=data.GB
    this.localITL=data.localITL
    this.localITLproxy=data.localITLproxy
    this.DH =data.DH
    this.KAM=data.KAM
    this.Dept=data.Dept
    this.Building=data.Building
    this.Floor=data.Floor
    this.labno=data.labno
    this.primarylabco=data.primarylabco
    this.secondarylabco=data.secondarylabco
    this.CC=data.CC
    this.kindoflab=data.kindoflab
    this.purposeoflab=data.purposeoflab
    this.description=data.description
    this.ACL=data.ACL
    //this.cmdb=data.cmdb
    this.otherLabType=data.otherLabType
    this.cmdbradio=data.cmdbradio
    this.sharedlabradio = data.sharedlabradio
    this.ACLradio = data.ACLradio
    this.greenports = data.greenports
    this.yellowports = data.yellowports
    this.redports = data.redports

}


applications: any[] = []; // Array to hold submitted applications
  formData: any = {}; // Object to store form data
  uniqueInstanceId: string = ''; // Unique instance ID for each application instance

  // Function to generate unique instance ID


  // Function to submit form data and create new application instance
  onformsubmit(): void {
    console.log('Submit button clicked');
    confirm('are u sure?')
    if (confirm('Are you sure you want to submit this form?')) {

    const formData = {
      region: this.region,
      country: this.country,
      location: this.location,
      locationCode: this.locationcode,
      entityName: this.entity,
      gb: this.GB,
      local_itl: this.localITL,
      local_itl_proxy: this.localITLproxy,
      dh: this.DH,
      kam: this.KAM,
      dep_name: this.Dept,
      building: this.Building,
      floor: this.Floor,
      labNo: this.labno,
      primary_lab_cord: this.primarylabco,
      secondary_lab_cord: this.secondarylabco,
      cost_center: this.CC,
      kind_of_lab: this.kindoflab,
      purpose_of_lab: this.purposeoflab,
      // "ACL Required": this.ACL,
      //otherLabType: this.otherLabType,
      new_equipment: this.cmdbradio,
      description:this.description,
      shared_lab: this.sharedlabradio,
      acl_req: this.ACLradio,
      green_ports: this.greenports,
      yellow_ports: this.yellowports,
      red_ports: this.redports,
      //approvalStatus: 'Pending' // Set approval status to 'Pending'
    };

    this.http.post("http://localhost:8080/boschLabs/form/submit", formData, { responseType: 'text' })
        .subscribe({
          next: (resultData: any) => {
            console.log('Form submitted successfully:', resultData);
            this.dialogRef.close(); // Close the dialog on success
          },
          error: (error: any) => {
            console.error('Error submitting form:', error);

          }
        });
    } else {
      console.log('Form submission cancelled by user.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
