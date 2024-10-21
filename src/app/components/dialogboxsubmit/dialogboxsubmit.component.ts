/* Edited By Jay Jambhale*/
import { CommonModule } from '@angular/common';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../data.service';
import { ToastrService } from 'ngx-toastr';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { AppComponent } from '../../app.component';
import { AngularModule } from '../../angularmodule/angularmodule.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule, LabCommissionComponent, AppComponent, AngularModule],
  templateUrl: './dialogboxsubmit.component.html',
  styleUrls: ['./dialogboxsubmit.component.scss'],
})
export class DialogboxsubmitComponent {
  @Output() formDataSubmitted = new EventEmitter<any>();

  region: string = '';
  country: string = '';
  location: string = '';
  locationcode: string = '';
  entity: string = '';
  GB: string = '';
  localITL: string = '';
  localITLproxy: string = '';
  DH: string = '';
  KAM: string = '';
  Dept: string = '';
  Building: string = '';
  Floor: string = '';
  labno: string = '';
  primarylabco: string = '';
  secondarylabco: string = '';
  CC: string = '';
  kindoflab: string = '';
  purposeoflab: string = '';
  description: string = '';
  ACL: string = '';
  otherLabType: string = '';
  cmdbradio: string = '';
  sharedlabradio: string = '';
  ACLradio: string = '';
  greenports: string = '';
  yellowports: string = '';
  redports: string = '';
  selfauditdate: string = '';
  selectedDate: string = '';
  approvalStatus: string = 'Pending';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogboxsubmitComponent>,
    private toastr: ToastrService,
    private dataService: DataService,  private http: HttpClient)
    {
    this.initializeFormData(data);
  }
  private initializeFormData(data: any): void {
    Object.assign(this, data); // Merge data into the component instance
    this.approvalStatus = 'Pending'; // Set default approval status
  }





  // constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogboxsubmitComponent>) {
    // this.region = data.region;
    // this.country=data.country
    // this.location=data.location
    // this.locationcode=data.locationcode
    // this.entity=data.entity
    // this.GB=data.GB
    // this.localITL=data.localITL
    // this.localITLproxy=data.localITLproxy
    // this.DH =data.DH
    // this.KAM=data.KAM
    // this.Dept=data.Dept
    // this.Building=data.Building
    // this.Floor=data.Floor
    // this.labno=data.labno
    // this.primarylabco=data.primarylabco
    // this.secondarylabco=data.secondarylabco
    // this.CC=data.CC
    // this.kindoflab=data.kindoflab
    // this.purposeoflab=data.purposeoflab
    // this.description=data.description
    // this.ACL=data.ACL
    // //this.cmdb=data.cmdb
    // this.otherLabType=data.otherLabType
    // this.cmdbradio=data.cmdbradio
    // this.sharedlabradio = data.sharedlabradio
    // this.ACLradio = data.ACLradio
    // this.greenports = data.greenports
    // this.yellowports = data.yellowports
    // this.redports = data.redports

//}


// applications: any[] = []; // Array to hold submitted applications
//   formData: any = {}; // Object to store form data
//   uniqueInstanceId: string = ''; // Unique instance ID for each application instance

//   // Function to generate unique instance ID


//   // Function to submit form data and create new application instance
//   onformsubmit(): void {
//     console.log('Submit button clicked');

//     if (confirm('Are you sure you want to submit this form?')) {
//       console.log('Confirmation received');

//       const formData = {
//         region: this.region,
//         country: this.country,
//         location: this.location,
//         locationCode: this.locationcode,
//         entityName: this.entity,
//         gb: this.GB,
//         local_itl: this.localITL,
//         local_itl_proxy: this.localITLproxy,
//         dh: this.DH,
//         kam: this.KAM,
//         dep_name: this.Dept,
//         building: this.Building,
//         floor: this.Floor,
//         labNo: this.labno,
//         primary_lab_cord: this.primarylabco,
//         secondary_lab_cord: this.secondarylabco,
//         cost_center: this.CC,
//         kind_of_lab: this.kindoflab,
//         purpose_of_lab: this.purposeoflab,
//         new_equipment: this.cmdbradio,
//         description: this.description,
//         shared_lab: this.sharedlabradio,
//         acl_req: this.ACLradio,
//         green_ports: this.greenports,
//         yellow_ports: this.yellowports,
//         red_ports: this.redports,
//       };

//       console.log('Form Data:', formData);

//       this.http.post("http://localhost:8080/boschLabs/form/submit", formData, { responseType: 'text' })
//           .subscribe({
//             next: (resultData: any) => {
//               console.log('Form submitted successfully:', resultData);
//               this.dialogRef.close(); // Close the dialog on success
//             },
//             error: (error: any) => {
//               console.error('Error submitting form:', error);
//             }
//           });
//   // region: string = '';
//   // country: string = '';
//   // location: string = '';
//   // locationcode: string = '';
//   // entity: string = '';
//   // GB: string = '';
//   // localITL: string = '';
//   // localITLproxy: string = '';
//   // DH: string = '';
//   // KAM: string = '';
//   // Dept: string = '';
//   // Building: string = '';
//   // Floor: string = '';
//   // labno: string = '';
//   // primarylabco: string = '';
//   // secondarylabco: string = '';
//   // CC: string = '';
//   // kindoflab: string = '';
//   // purposeoflab: string = '';
//   // description: string = '';
//   // ACL: string = '';
//   // otherLabType: string = '';
//   // cmdbradio: string = '';
//   // sharedlabradio: string = '';
//   // ACLradio: string = '';
//   // greenports: string = '';
//   // yellowports: string = '';
//   // redports: string = '';
//   // selfauditdate: string = '';
//   // selectedDate: string = '';
//   // approvalStatus: string = 'Pending'; // Default approval status

//     }



  onFormSubmit(): void {
    if (confirm('Are you sure you want to submit this form?')) {
      const formData = {
        Region: this.region,
        Country: this.country,
        'Location-Code': this.locationcode,
        Entity: this.entity,
        GB: this.GB,
        'Local-ITL': this.localITL,
        'Local-ITL Proxy': this.localITLproxy,
        'Department Head (DH)': this.DH,
        'Key Account Manager (KAM)': this.KAM,
        Department: this.Dept,
        Building: this.Building,
        Floor: this.Floor,
        'Lab No': this.labno,
        'Primary Lab Coordinator': this.primarylabco,
        'Secondary Lab Coordinator': this.secondarylabco,
        'Cost Center': this.CC,
        'Kind of Lab': this.kindoflab,
        'Purpose of Lab in Brief': this.purposeoflab,
        Description: this.description,
        otherLabType: this.otherLabType,
        'Is lab going to procure new equipment for Engineering/Red Zone?':
          this.cmdbradio,
        'Shared Lab': this.sharedlabradio,
        'ACL Required': this.ACLradio,
        'No. of Green Ports': this.greenports,
        'No. of Yellow Ports': this.yellowports,
        'No. of Red Ports': this.redports,
        'Self Audit Date': this.selectedDate,
        approvalStatus: this.approvalStatus,
      };

      this.dataService.submitForm(formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.dialogRef.close();
          this.toastr.success('Process initiated', 'Waiting for approval');
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.toastr.error('Submission failed. Please try again.');
        },
      });
    } else {
      console.log('Form submission cancelled by user.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
