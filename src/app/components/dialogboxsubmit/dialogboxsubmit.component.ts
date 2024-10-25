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
  cmdbradio: string = '';
  otherLabType: string = '';
  sharedlabradio: string = '';
  ACLradio: string = '';
  greenports: string = '';
  yellowports: string = '';
  redports: string = '';
  selectedDate: string = '';
  approvalStatus: string = 'Pending'; // Default approval status
  formData: any;

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
      this.formData = {
        region: this.region,
        country: this.country,
        locationCode: this.locationcode,
        gb: this.GB,
        local_itl: this.localITL,
        entityName: this.entity,
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
        new_equipment: this.otherLabType,
        shared_lab: this.sharedlabradio,
        acl_req: this.ACLradio,
        green_ports: this.greenports,
        yellow_ports: this.yellowports,
        red_ports: this.redports,
        self_audit_date: this.selectedDate,
        approvalStatus: this.approvalStatus,
      };

      this.dataService.submitForm(this.formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.toastr.success('Process Initiated for New lab Commission');
          this.dialogRef.close(); // Close the dialog on successful submission
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
