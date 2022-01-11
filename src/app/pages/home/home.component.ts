import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageText: string;
  constructor() { }

  ngOnInit(): void {
    this.pageText = "HomePage";
  }

}
