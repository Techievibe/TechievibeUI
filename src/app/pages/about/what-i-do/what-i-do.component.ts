import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-what-i-do',
  templateUrl: './what-i-do.component.html',
  styleUrls: ['./what-i-do.component.css']
})
export class WhatIDoComponent implements OnInit {

  lastUpdatedDate: Date;
  constructor() { 
    this.lastUpdatedDate = new Date();
    this.lastUpdatedDate.setDate(this.lastUpdatedDate.getDate() - 7);
  }

  ngOnInit(): void {
  }

}
