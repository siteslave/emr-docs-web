import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  fullname: string;

  constructor() {
    this.fullname = sessionStorage.getItem('fullname');
  }

  ngOnInit() {

  }

}
