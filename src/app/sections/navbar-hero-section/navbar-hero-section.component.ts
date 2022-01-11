import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-hero-section',
  templateUrl: './navbar-hero-section.component.html',
  styleUrls: ['./navbar-hero-section.component.css']
})
export class NavbarHeroSectionComponent implements OnInit {

  @Input() page: string;
  @Input() heroHeading: boolean;
  @Input() heroButtons: boolean;
  @Input() heroLogo: boolean;
  constructor() { }

  ngOnInit(): void {

  }

}
