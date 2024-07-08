import { CommonModule } from '@angular/common';
import { Component, Input, Inject, Output, EventEmitter  } from '@angular/core';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { AppComponent } from '../../app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs


@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule,LabCommissionComponent,AppComponent,MatDialogModule,MatInputModule],
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







  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogboxsubmitComponent>,) {
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
  onformsubmit() {

    const uniqueInstanceId = uuidv4();
    console.log('Generated unique instance ID:', uniqueInstanceId);

    // Example: Submit form data with unique instance ID
    const formData = {
      instanceId: uniqueInstanceId,
      region: this.data.region,
      country: this.data.country,
      // Add other fields as needed
    };

    // Assuming you have a method to submit form data, you can call it here
    // Replace submitForm with your actual method name
    this.formDataSubmitted.emit(formData); // Emit event with unique ID
    this.submitForm(formData);
    this.dialogRef.close();
  }

  submitForm(formData: any): void {
    console.log('Submitting form with data:', formData);

    // Implement your form submission logic here (e.g., HTTP post request)
  }


  closeDialog(){
    this.dialogRef.close();
  }


}



