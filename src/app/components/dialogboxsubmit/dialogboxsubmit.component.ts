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
  approvalStatus: string = 'Pending'; // Default approval status

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogboxsubmitComponent>,
    private toastr: ToastrService,
    private dataService: DataService
  ) {
    this.initializeFormData(data);
  }

  private initializeFormData(data: any): void {
    Object.assign(this, data); // Merge data into the component instance
    this.approvalStatus = 'Pending'; // Set default approval status
  }

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
