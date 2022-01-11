import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-navbar-hero-content-section',
  templateUrl: './navbar-hero-content-section.component.html',
  styleUrls: ['./navbar-hero-content-section.component.css']
})
export class NavbarHeroContentSectionComponent implements OnInit {

  isWhoIam : Boolean;
  isHome : Boolean;
  currentUrl: string;

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {

      if (evt instanceof NavigationEnd) {
          this.currentUrl = evt.url;

          console.log("currentUrl : " + this.currentUrl);

          this.setPaths();
      }
    });
  }

  setPaths(): void {
    switch(this.currentUrl)
    {
      case "/":
      case "/home":
          {
            this.isHome = true;
            this.isWhoIam = false;
          }
          case "/about/who-i-am":
            {
              this.isWhoIam = true;
              this.isHome = false;
            }

    }
  }

}
