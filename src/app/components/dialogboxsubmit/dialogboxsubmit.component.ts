import { CommonModule } from '@angular/common';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule if using ngModel

@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule, FormsModule],
  templateUrl: './dialogboxsubmit.component.html',
  styleUrls: ['./dialogboxsubmit.component.scss']
})
export class DialogboxsubmitComponent {
  @Output() formDataSubmitted = new EventEmitter<any>();

  region: string;
  country: string;
  location: string;
  locationcode: string;
  entity: string;
  GB: string;
  localITL: string;
  localITLproxy: string;
  DH: string;
  KAM: string;
  Dept: string;
  Building: string;
  Floor: string;
  labno: string;
  primarylabco: string;
  secondarylabco: string;
  CC: string;
  kindoflab: string;
  purposeoflab: string;
  description: string;
  ACL: string;
  greenports: string;
  yellowports: string;
  redports: string;
  cmdbradio: string;
  sharedlabradio: string;
  ACLradio: string;
  //otherLabType: string;

  // Initializing form values with data injected
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogboxsubmitComponent>, private http: HttpClient) {
    this.region = data.region;
    this.country = data.country;
    this.location = data.location;
    this.locationcode = data.locationcode;
    this.entity = data.entity;
    this.GB = data.GB;
    this.localITL = data.localITL;
    this.localITLproxy = data.localITLproxy;
    this.DH = data.DH;
    this.KAM = data.KAM;
    this.Dept = data.Dept;
    this.Building = data.Building;
    this.Floor = data.Floor;
    this.labno = data.labno;
    this.primarylabco = data.primarylabco;
    this.secondarylabco = data.secondarylabco;
    this.CC = data.CC;
    this.kindoflab = data.kindoflab;
    this.purposeoflab = data.purposeoflab;
    this.description = data.description;
    this.ACL = data.ACL;
    this.cmdbradio = data.cmdbradio;
    this.sharedlabradio = data.sharedlabradio;
    this.ACLradio = data.ACLradio;
    this.greenports = data.greenports;
    this.yellowports = data.yellowports;
    this.redports = data.redports;
  }

  onformsubmit(): void {
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
        description: this.description,
        new_equipment: this.cmdbradio,
        shared_lab: this.sharedlabradio,
        acl_req: this.ACLradio,
        green_ports: this.greenports,
        yellow_ports: this.yellowports,
        red_ports: this.redports,
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
