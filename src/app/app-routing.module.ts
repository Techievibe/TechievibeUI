import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './landing/landing.component';
import { WhoIAmComponent } from './pages/about/who-i-am/who-i-am.component';
import { ProfileComponent } from './profile/profile.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { WhatIDoComponent } from './pages/about/what-i-do/what-i-do.component';
import { MyGoalsComponent } from './pages/about/my-goals/my-goals.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'about/who-i-am',
    component: WhoIAmComponent

  },
  {
    path: 'about/what-i-do',
    component: WhatIDoComponent

  },
  {
    path: 'about/my-goals',
    component: MyGoalsComponent

  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: NotfoundComponent }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }