import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from 'src/app/models/user-profile';
import { ProfileDataService } from 'src/app/services/profile-data.service';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
    givenName?: string,
    surname?: string,
    userPrincipalName?: string,
    id?: string
  };

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    profile!: ProfileType;
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private userProfile: UserProfile;
    private  emailAddress: string;
    isIframe = false;
    loginDisplay = false;
    private readonly _destroying$ = new Subject<void>();
    constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, 
                    public location: Location, private router: Router, 
                    private authService: MsalService, private broadcastService: MsalBroadcastService,
                    private http: HttpClient, private profileDataService: ProfileDataService) {
        
    }

    async ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });

     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });

     //MS AD START
     this.isIframe = window !== window.parent && !window.opener;

     this.broadcastService.inProgress$
     .pipe(
       filter((status: InteractionStatus) => status === InteractionStatus.None),
       takeUntil(this._destroying$)
     )
     .subscribe(() => {
       this.setLoginDisplay();
     })

    }

    getProfileFromService(): Boolean {
      //alert("setting profile, user is already logged in");
      //alert(this.userProfile);
      this.profileDataService.ProfileData.subscribe((user: UserProfile) => {
        //alert("this is data stored for user." + JSON.stringify(user));
        this.userProfile = user;
      });
      if(this.userProfile != null)
        return true;
      else
        return false;
    }

    getProfile() {
        this.http.get(GRAPH_ENDPOINT)
          .subscribe(profile => {
            console.log(profile);
            this.profile = profile;
            this.userProfile.first_name = this.profile.givenName;
            this.userProfile.last_name = this.profile.surname;
            this.profileDataService.ProfileData.next(this.userProfile);
            console.clear();
            console.log("User profile populated" + JSON.stringify(this.userProfile));
          });
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }


    //LOGIN AND LOGOUT REDIRECT

  // login() {
  //   if (this.msalGuardConfig.authRequest){
  //     this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
  //   } else {
  //     this.authService.loginRedirect();
  //   }
  // }

  // logout() {
  //   this.authService.logoutRedirect({
  //     postLogoutRedirectUri: 'http://localhost:3899'
  //   });
  // }

  //LOGIN AND LOGOUT POPUP

  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe({
          next: (result) => {
            console.log(result);
            this.userProfile = new UserProfile();
            this.userProfile.email_address = result.account.username;
            this.setLoginDisplay();
            this.getProfile();
          },
          error: (error) => console.log(error)
        });
    } else {
      this.authService.loginPopup()
        .subscribe({
          next: (result) => {
            console.log(result);
            this.userProfile = new UserProfile();
            this.userProfile.email_address = result.account.username;
            this.setLoginDisplay();
            this.getProfile();
          },
          error: (error) => console.log(error)
        });
    }
  }

  logout() { // Add log out function here
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
   
    if(this.loginDisplay)
     {
        this.getProfileFromService();
     }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }



}
