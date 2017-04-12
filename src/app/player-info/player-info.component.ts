import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

    @Input() childCurrentPlayer;

  constructor() { }

  ngOnInit() {
  }

}
