import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
    @Input() cardToDisplay;
    @Output() yesOrNo = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    // yesPlease() {
    //     this.clickSender.emit('yes')
    // }
    // noThanks() {
    //     this.clickSender.emit('no')
    // }
}
