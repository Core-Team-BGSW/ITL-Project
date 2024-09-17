import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { LabCommissionComponent } from '../../components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from '../../components/self-check/self-check.component';
import { SoftwareTrackingComponent } from '../../components/software-tracking/software-tracking.component';
import { LabDecommissionComponent } from '../../components/lab-decommission/lab-decommission.component';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[CommonModule, MatButtonModule, MatCardModule, MatToolbar,RouterLink, AboutComponent, LabCommissionComponent, SelfCheckComponent, SoftwareTrackingComponent, LabDecommissionComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],


})
export class DashboardComponent implements AfterViewInit {

  toggleProperty = true;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    // Use ActivatedRoute to access fragments
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  navigateToQuiz() {
    if (this.videoPlayer.nativeElement.currentTime >= this.videoPlayer.nativeElement.duration) {
      this.router.navigate(['/register']);

    } else {
      alert('Please watch the entire video before proceeding.');
    }
  }
  ngOnInit(): void {
    // Initialization code here
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }


}


