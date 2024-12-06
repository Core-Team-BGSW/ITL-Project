import { Component, Inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LabCommissionComponent } from './components/lab_commission/lab_commission.component';
import { SelfCheckComponent } from './components/self-check/self-check.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabDecommissionComponent } from './components/lab-decommission/lab-decommission.component';
import { AuditComponent } from './components/audit/audit.component';
import { SelfAuditComponent } from './self-audit/self-audit.component';
import { AngularModule } from './angularmodule/angularmodule.module';
import { LayoutComponent } from './admin/layout/layout.component';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { LoginService } from './service/login.service';
import { isPlatformBrowser } from '@angular/common';

import { AuthenticationResult, EventMessage, InteractionStatus, PopupRequest, RedirectRequest,EventType } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    SelfCheckComponent,
    ReactiveFormsModule,
    FormsModule,
    LabDecommissionComponent,
    ReactiveFormsModule,
    AuditComponent,
    SelfAuditComponent,
    AngularModule,
    LayoutComponent,
  ],
})
export class AppComponent {
  title = 'Angular_app';
  isOpen: any;
  isIframe = false;
  loginDisplay = false;
  isBrowser:boolean;
  userId: string | null = null;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private loginservice:LoginService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {this.isBrowser = isPlatformBrowser(this.platformId);}


  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
    if(this.isBrowser){
      this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

      this.loginservice.setLoginDisplay();

      this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
      this.msalBroadcastService.msalSubject$
        .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
        )
        .subscribe((result: EventMessage) => {
          if (this.authService.instance.getAllAccounts().length === 0) {
            window.location.pathname = "/";
          } else {
            this.setLoginDisplay();
          }
        });

      this.msalBroadcastService.inProgress$
        .pipe(
          filter((status: InteractionStatus) => status === InteractionStatus.None),
          takeUntil(this._destroying$)
        )
        .subscribe(() => {
          this.setLoginDisplay();
          this.checkAndSetActiveAccount();

        });

        // this.loginservice.userId$.subscribe((id) => {
        //   this.userId = id;
        //   if (this.userId) {
        //     console.log(this.userId);
        //     this.loginservice.fetchPermissionsAndRoles(this.userId).subscribe(() => {
        //       console.log('Permissions loaded for userId:', this.userId);
        //     });
        //   }
        // });


      }



  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
