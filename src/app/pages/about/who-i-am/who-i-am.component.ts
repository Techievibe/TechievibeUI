import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-who-i-am',
  templateUrl: './who-i-am.component.html',
  styleUrls: ['./who-i-am.component.css']
})
export class WhoIAmComponent implements OnInit {

  pageText: string;
  constructor() { }

  ngOnInit(): void {
    this.pageText = "WhoIamPage";
  }

}
