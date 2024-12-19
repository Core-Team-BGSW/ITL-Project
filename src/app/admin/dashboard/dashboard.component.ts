import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { imagemodule } from '../../angularmodule/imagemodule.module';

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
    imagemodule,
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
    this.router.navigate(['/quiz']);
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }
}
