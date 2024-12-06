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
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs/internal/operators/filter';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';

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
export class DashboardComponent implements AfterViewInit {
  toggleProperty = true;
  loginDisplay = false;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  constructor(private router: Router, private route: ActivatedRoute,private authService: MsalService, private msalBroadcastService: MsalBroadcastService) {}

  ngAfterViewInit(): void {
    // Use ActivatedRoute to access fragments
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  navigateToQuiz() {
    if (
      this.videoPlayer.nativeElement.currentTime >=
      this.videoPlayer.nativeElement.duration
    ) {
      this.router.navigate(['/quiz']);
    } else {
      alert('Please watch the entire video before proceeding.');
    }
  }
  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    )
    .subscribe((result: EventMessage) => {
      console.log(result);
      const payload = result.payload as AuthenticationResult;
      this.authService.instance.setActiveAccount(payload.account);
    });

  this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
    // Initialization code here
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
