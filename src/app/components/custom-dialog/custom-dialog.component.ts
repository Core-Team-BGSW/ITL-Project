import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../data.service';
import { ToastrService } from 'ngx-toastr';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { imagemodule } from '../../angularmodule/imagemodule.module';
import { AngularModule } from '../../angularmodule/angularmodule.module';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [CommonModule, LabCommissionComponent, imagemodule, AngularModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss',
})
export class CustomDialogComponent {
  @Input() isOpen: boolean = false; // Track whether the dialog is open
  @Input() data: any; // Data passed to the modal
  @Output() close = new EventEmitter<any>();

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

  constructor(private toastr: ToastrService, private dataService: DataService) {
    //this.initializeFormData(this.formData);
  }
  // private initializeFormData(formData: any): void {
  //   Object.assign(this, this.formData); // Merge data into the component instance
  //   this.approvalStatus = 'Pending'; // Set default approval status
  // }

  onFormSubmit(): void {
    if (confirm('Are you sure you want to submit this form?')) {
      this.formData = {
        region: this.data.region,
        country: this.data.country,
        locationCode: this.data.locationcode,
        gb: this.data.GB,
        local_itl: this.data.localITL,
        entityName: this.data.entity,
        local_itl_proxy: this.data.localITLproxy,
        dh: this.data.DH,
        kam: this.data.KAM,
        dep_name: this.data.Dept,
        building: this.data.Building,
        floor: this.data.Floor,
        labNo: this.data.labno,
        primary_lab_cord: this.data.primarylabco,
        secondary_lab_cord: this.data.secondarylabco,
        cost_center: this.data.CC,
        kind_of_lab: this.data.kindoflab,
        purpose_of_lab: this.data.purposeoflab,
        description: this.data.description,
        new_equipment: this.data.otherLabType,
        shared_lab: this.data.sharedlabradio,
        acl_req: this.data.ACLradio,
        green_ports: this.data.greenports,
        yellow_ports: this.data.yellowports,
        red_ports: this.data.redports,
        self_audit_date: this.data.selectedDate,
        approvalStatus: this.data.approvalStatus,
      };

      this.dataService.submitForm(this.formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.toastr.success(
            'Process Initiated for New lab Commission',
            'Success',
            {
              timeOut: 5000,
            }
          );
          this.isOpen = false;
          this.close.emit();
          //window.location.reload();
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
      });
    }
  }
  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }
}
