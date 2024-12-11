import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AccountInfo, EventMessage, EventType, RedirectRequest } from '@azure/msal-browser';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginDisplay$ = new BehaviorSubject<boolean>(false);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();
  constructor(private authService: MsalService,@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,private msalBroadcastService: MsalBroadcastService,private http:HttpClient) {
    this.listenForLogin();
    this.loadUserId();
  }
  private listenForLogin() {
    this.msalBroadcastService.msalSubject$.subscribe((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        this.loadUserId(); // Reload userId after login
      }
    });
  }

  private loadUserId() {
    let account = this.authService.instance.getActiveAccount();
    if (!account) {
      const accounts = this.authService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.authService.instance.setActiveAccount(accounts[0]);
        account = accounts[0];
      }
    }
    if (account) {
      this.userIdSubject.next(account.username.split('@')[0]);
    }
  }

  getNtId(): string | null {
    return this.userIdSubject.getValue();
  }

  setLoginDisplay() {
    const accounts = this.authService.instance.getAllAccounts();
    this.loginDisplay$.next(accounts.length > 0);
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }
  getUserId():any {
    const account: AccountInfo | null = this.authService.instance.getActiveAccount();
    if (account) {
      return account.name;// or account.username for email
      // return account.name;
    }
    return null; // No active account found
  }

  getUserInfo():any{
    const account: AccountInfo | null = this.authService.instance.getActiveAccount();
    if (account) {
      return console.log(account)// or account.username for email
    }
    return null; // No active account found
  }

  setLoginDisplay1() {
    return this.authService.instance.getAllAccounts().length > 0;
  }


  private apiUrl = 'http://localhost:8080/users';
  private rolesSubject = new BehaviorSubject<Set<string> | null>(null); // Explicitly typed as Set<string>
  private permissions: Set<string> = new Set();


  fetchPermissionsAndRoles(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/permissions/user/${userId}`).pipe(
      tap((response) => {
        const roles = new Set<string>(response.roles); // Explicitly typed as Set<string>
        this.rolesSubject.next(roles);
        this.permissions = new Set<string>(response.permissions);
      })
    );
  }

  getRoles(): Observable<Set<string> | null> {
    return this.rolesSubject.asObservable();
  }

  hasRole(role: string): boolean {
    const roles = this.rolesSubject.getValue();
    return roles ? roles.has(role) : false;
  }

  hasAnyRole(rolesToCheck: string[]): boolean {
    const roles = this.rolesSubject.getValue();
    return roles ? rolesToCheck.some(role => roles.has(role)) : false;
  }

  hasPermissionForComponent(componentName: string): boolean {
    return this.permissions.has(componentName);
  }



}
