import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { LabCommissionComponent } from '../../components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from '../../components/self-check/self-check.component';
import { SoftwareTrackingComponent } from '../../components/software-tracking/software-tracking.component';
import { LabDecommissionComponent } from '../../components/lab-decommission/lab-decommission.component';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[CommonModule, MatButtonModule, MatCardModule, MatToolbar,RouterLink, AboutComponent, LabCommissionComponent, SelfCheckComponent, SoftwareTrackingComponent, LabDecommissionComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


})
export class DashboardComponent implements OnInit {

  toggleProperty = true;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialization code here
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

}
