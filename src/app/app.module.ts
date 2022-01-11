import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule} from './app-routing.module'

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';

import { HomeModule } from './home/home.module';
import { CallbackComponent } from './shared/callback/callback.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WhoIAmComponent } from './pages/about/who-i-am/who-i-am.component';
import { SectionsModule } from './sections/sections.module';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { SharedModule } from './shared/shared.module';
import { WhatIDoComponent } from './pages/about/what-i-do/what-i-do.component';
import { MyGoalsComponent } from './pages/about/my-goals/my-goals.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProfileComponent,
    CallbackComponent,
    WhoIAmComponent,
    HomeComponent,
    NotfoundComponent,
    WhatIDoComponent,
    MyGoalsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    SectionsModule,
    SharedModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '089999f1-284d-4500-9483-53a89aee8fa0', // This is your client ID
        authority: 'https://login.microsoftonline.com/4bb0e47c-bc75-4eec-ba9f-54a678bb146b', // This is your tenant ID
        redirectUri: 'http://localhost:3899'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Popup,
      authRequest: {
        scopes: ['user.read']
        }
    }, {
      interactionType: InteractionType.Popup, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([ 
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ['https://localhost:44318/weatherforecast',['api://d8c11b27-aaf6-4654-b1a2-d79336a46724/ApiData.Read']]
      ])
    })
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
