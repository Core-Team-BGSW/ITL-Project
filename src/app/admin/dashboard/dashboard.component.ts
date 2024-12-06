import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { LabCommissionComponent } from '../../components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from '../../components/self-check/self-check.component';
import { SoftwareTrackingComponent } from '../../components/software-tracking/software-tracking.component';
import { LabDecommissionComponent } from '../../components/lab-decommission/lab-decommission.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbar,
    RouterLink,
    AboutComponent,
    SelfCheckComponent,
    SoftwareTrackingComponent,
    LabDecommissionComponent,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  toggleProperty = true;
  videoWatched = false; // To track if the video is watched completely

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialization code here
  }

  ngAfterViewInit(): void {
    // Scroll to the target section if a fragment is provided in the URL
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Method to navigate to quiz after video completion
  navigateToQuiz() {
    // if (this.videoWatched) {
      this.router.navigate(['/quiz']);
    // } else {
    //   alert('Please watch the entire video before proceeding.');
    // }
  }

  // // Method to handle video playback events and check if it's complete
  // onVideoEnd() {
  //   this.videoWatched = true; // Set flag when video ends
  // }

  // // Method to control playback and ensure the video is watched completely
  // handleVideoProgress() {
  //   const videoElement = this.videoPlayer.nativeElement;
  //   if (videoElement.currentTime === videoElement.duration) {
  //     // Ensure that the video is watched fully
  //     this.videoWatched = true;
  //   }
  // }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }
}
