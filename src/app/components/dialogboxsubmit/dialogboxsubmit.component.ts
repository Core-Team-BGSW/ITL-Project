import { CommonModule } from '@angular/common';
import { Component, Input, Inject, Output, EventEmitter  } from '@angular/core';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { AppComponent } from '../../app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs
import { DataService } from '../../data.service';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule,LabCommissionComponent,AppComponent,MatDialogModule,MatInputModule, ],
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
  description :string;
  ACL:string;
  greenports:string;
  yellowports:string;
  redports:string;
  cmdbradio:string;
  sharedlabradio:string;
  ACLradio:string;
  otherLabType:string;
  selfauditdate:string;
  selectedDate : string;







  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogboxsubmitComponent>,private toastr: ToastrService,  private dataService : DataService, private http: HttpClient) {
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
    this.description = data.description
    this.ACL=data.ACL
    //this.cmdb=data.cmdb
    this.otherLabType=data.otherLabType
    this.cmdbradio=data.cmdbradio
    this.sharedlabradio = data.sharedlabradio
    this.ACLradio = data.ACLradio
    this.greenports = data.greenports
    this.yellowports = data.yellowports
    this.redports = data.redports
    this.selfauditdate = data.selfauditdate
    this.selectedDate = data.selectedDate

}


applications: any[] = []; // Array to hold submitted applications
  formData: any = {}; // Object to store form data
  uniqueInstanceId: string = ''; // Unique instance ID for each application instance

  // Function to generate unique instance ID


  // Function to submit form data and create new application instance
  onformsubmit(): void {
    if (confirm('Are you sure you want to submit this form?')) {

    const formData = {
      Region: this.region,
      Country: this.country,
      Location: this.location,
      "Location-Code": this.locationcode,
      Entity: this.entity,
      GB: this.GB,
      "Local-ITL": this.localITL,
      "Local-ITL Proxy": this.localITLproxy,
      "Department Head (DH)": this.DH,
      "Key Account Manager (KAM)": this.KAM,
      Department: this.Dept,
      Building: this.Building,
      Floor: this.Floor,
      "Lab No": this.labno,
      "Primary Lab Coordinator": this.primarylabco,
      "Secondary Lab Coordinator": this.secondarylabco,
      "Cost Center": this.CC,
      "Kind of Lab": this.kindoflab,
      "Purpose of Lab in Brief": this.purposeoflab,
      "Description" : this.description,
      // "ACL Required": this.ACL,
      otherLabType: this.otherLabType,
      "Is lab going to procure new equipment for Engineering/Red Zone?": this.cmdbradio,
      "Shared Lab": this.sharedlabradio,
      "ACL Required": this.ACLradio,
      "No. of Green Ports": this.greenports,
      "No. of Yellow Ports": this.yellowports,
      "Self Audit Date": this.selectedDate,
      "No. of Red Ports": this.redports,
      approvalStatus: 'Pending' // Set approval status to 'Pending'
    };

    this.dataService.submitForm(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        this.dialogRef.close(); // Close the dialog on success
        this.toastr.success('Process initiated', 'Waiting for approval')
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        // Optionally, you can show an error message
      }



    });
  } else {
    // User clicked "Cancel", handle accordingly
    console.log('Form submission cancelled by user.');
  }


  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }


}






