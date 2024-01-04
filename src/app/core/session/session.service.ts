import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriptions } from 'src/app/utility/common.model';
import { IDGenerator } from 'src/app/utility/id-generator.util';
import { Store } from '../store/store';
import { Session, SessionAccount } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends Store.AbstractService {

  private static RESTRICTED_REDIRECT_URLS: string[] = [
    '/loading',
    '/login',
    '/logout'
  ];


  // sessionValidityTimer: NodeJS.Timer;
  sessionValidityTimer: any;

  private redirectURL: string;
  private redirectToken: string;
  session: Session;
  account: SessionAccount;
  tabSessionId: string;

  private subscriptions: Subscriptions = {
    sessionValidate: null
  };

  constructor(
    private router: Router,
  ) {
    super();
    const me = this;

    me.tabSessionId = IDGenerator.newId();

    // me.router.events.subscribe((re: RouterEvent) => {
    //   me.onRouterEvent(re);
    // });

    window['getAccessToken'] = () => {
      return me.session.token;
    }

  }

  init() {
    const me = this;
    // me.setRedirectURL();
    // return new Promise<void>((resolve, reject) => {

    // });
  }

  redirectToLoginPage() {
    const me = this;
    me.setRedirectURL();
    me.router.navigate(['/login']);
  }

  redirectToHomePage() {
    const me = this;
    let redirectTo = '/home';
    if (me.redirectToken && me.redirectURL) {
      redirectTo = me.redirectURL;
      me.redirectToken = null;
    }

    me.router.navigate([redirectTo]);
  }

  private setRedirectURL(url?: string) {
    const me = this;
    let redirectURL: '/app';

    me.redirectToken = IDGenerator.newId();

    if (SessionService.RESTRICTED_REDIRECT_URLS.indexOf(redirectURL) !== -1) {
      redirectURL = null;
    }

    me.redirectURL = redirectURL;
    console.log(" me.redirectURL ", me.redirectURL);
  }

  private isSSORequest(): boolean {
    return window.location.hash.startsWith('#id_token');
  }

  // public login(credentials: LoginCredentials): Observable<Store.State> {
  //   const me = this;
  //   const output = new Subject<Store.State>();

  //   setTimeout(() => {
  //     output.next(new SessionCreatingState());
  //   }, 0);


  //   me.controller.post<AuthTokenResponse>(environment.api.session.login.endpoint, credentials).subscribe(
  //     (data: AuthTokenResponse) => {

  //       if (data) {
  //         me.session = {
  //           token: data.token,
  //           id: IDGenerator.newId(),
  //           expiry: moment().add(1, 'day').toDate()
  //         };

  //         AppLocalStorage.set('SESSION', 'SESSION', me.session);

  //         me.loadAccount().subscribe(() => {
  //           me.redirectToHomePage();
  //           me.startSessionValidation();
  //           output.complete();

  //         });

  //       } else {
  //         console.error('No Token Received');
  //         setTimeout(() => {
  //           output.error(new SessionCreatingErrorState(new AppError('No Token Received')));
  //           output.complete();
  //         }, 0);
  //       }

  //     },
  //     (e: Error) => {
  //       console.error(e);
  //       setTimeout(() => {
  //         output.error(new SessionCreatingErrorState(AppError.fromError(e)));
  //         output.complete();
  //       }, 0);
  //     }
  //   );

  //   return output;
  // }

  // public logout(): Observable<Store.State> {
  //   const me = this;
  //   const output = new Subject<Store.State>();

  //   setTimeout(() => {
  //     output.next(new LogoutLoadingState());
  //   }, 0);

  //   me.controller.get(environment.api.session.logout.endpoint,{Authorization:true}).subscribe(
  //     (data: LogoutResponse) => {
  //       if (data) {
  //         output.next(new LogoutLoadedState(data))
  //         output.complete();
  //       } 
  //     },
  //     (e: Error) => {
  //       console.error(e);
  //       setTimeout(() => {
  //         output.error(new LogoutErrorState(AppError.fromError(e)));
  //         output.complete();
  //       }, 0);
  //     }
  //   );

  //   return output;


  // }

  // private loadAccount(): Observable<void> {
  //   const me = this;
  //   const output = new Subject<void>();

  //   const path = environment.api.auth.me.endpoint;

  //   me.controller.get(path, null, undefined, { Authorization: true }).subscribe(
  //     (data: SessionAccount) => {
  //       // console.log(data);
  //       me.account = me.customUtilityService.prepareAccountObject(data as SessionAccount);
  //       me.refreshPermissions(output);     
  //     },
  //     (e: any) => {
  //       output.error(new Error('Failed to Load Account'));
  //       output.complete();
  //     }
  //   );

  //   return output;
  // }

  // private refreshPermissions(subject: Subject<void>) {
  //   const me = this;
  //   //TODO: Do Not Remove this code.
  //   // const permissions = Object.keys(me.account.permissions); 
  //   // console.debug('Current User\'s Permissions', permissions);
  //   // me.permissionsService.loadPermissions(permissions);
  //   subject.next();
  //   subject.complete();
  // }

  // // RolePermission[]
  // public getRolePermissionsFor(code: string): any[] {
  //   const me = this;
  //   if (me.account && me.account.permissions && me.account.permissions[code]) {
  //     return Object.values(me.account.permissions[code]);
  //   }
  //   return null;
  // }


  // private startSessionValidation() {
  //   const me = this;
  //   me.stopSessionValidation();
  //   me.sessionValidityTimer = setTimeout(() => {
  //     me.validateSession();
  //   }, 60000);
  // }

  // private stopSessionValidation() {
  //   const me = this;
  //   if (me.sessionValidityTimer) {
  //     clearTimeout(me.sessionValidityTimer);
  //   }
  // }

  // private validateSession() {
  //   const me = this;

  //   console.debug('Validating Session');

  //   const path = environment.api.auth.validate.endpoint;
  //   me.controller.get(path, null, undefined, { Authorization: true }).subscribe(
  //     (data: any) => {
  //       me.startSessionValidation();
  //     },
  //     (e: any) => {
  //       me.router.navigate(['logout']);
  //     }
  //   );
  // }



  // private initSession(resolve: (() => void), reject: ((reason: AppError) => void)) {
  //   const me = this;

  //   const session: Session = AppLocalStorage.get('SESSION', 'SESSION') as Session;

  //   if (me.isSessionActive(session)) {
  //     me.session = session;
  //     me.loadAccount().subscribe(() => {
  //       me.validateSession();
  //       resolve();
  //       me.redirectToHomePage();
  //     }, (error) => {
  //       reject(new AppError(error));
  //     });
  //     return;
  //   }

  //   if (me.isSSORequest()) {
  //     resolve();
  //     return;
  //   }

  //   // Redirect to Login
  //   me.router.navigate(['login']);
  //   resolve();

  // }

  // public isActive(): boolean {
  //   return this.isSessionActive(this.session);
  // }

  // public clear(): Observable<any> {
  //   const output = new Subject<any>();
  //   const me = this;

  //   // Clear session local storage
  //   AppLocalStorage.clear('SESSION', 'SESSION');

  //   // Stop session validation check
  //   me.stopSessionValidation();

  //   // Reset Session
  //   me.session = null;

  //   setTimeout(() => {
  //     output.next()
  //   });

  //   return output;
  // }

  // public hasPermissionsAll(permissions: string[]): boolean {
  //   const me = this;
  //   const sessionPermissions: NgxPermissionsObject = me.permissionsService.getPermissions();
  //   let flag = true;

  //   for (const permission of permissions) {
  //     if (!sessionPermissions[permission]) {
  //       flag = false;
  //       break;
  //     }
  //   }

  //   return flag;
  // }

  // private isSessionActive(session: Session): boolean {
  //   return !!session;
  // }

  // private onRouterEvent(event: RouterEvent) {
  //   const me = this;

  //   if (event instanceof NavigationEnd) {

  //     switch (event.url) {
  //       case '/loading':
  //         me.redirectToken = null;
  //         break;
  //     }

  //   }
  // }

}
