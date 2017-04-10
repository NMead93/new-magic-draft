import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    displayOverlay: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  beginDrafting() {
      this.displayOverlay = true;
  }

}
