import { CommonModule } from '@angular/common';
import { Component, Input, Inject  } from '@angular/core';
import { LabCommissionComponent } from '../lab_commission/lab_commission.component';
import { AppComponent } from '../../app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogboxsubmit',
  standalone: true,
  imports: [CommonModule,LabCommissionComponent,AppComponent,MatDialogModule,MatInputModule,],
  templateUrl: './dialogboxsubmit.component.html',
  styleUrl: './dialogboxsubmit.component.scss'
})

export class DialogboxsubmitComponent {
  //@Input() data: any;


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







  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogboxsubmitComponent>) {
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



closeDialog(){
  this.dialogRef.close();
}
}
