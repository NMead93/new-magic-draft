import { Component, OnInit } from '@angular/core';
import { MagicService } from '../magic.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Booster } from '../booster.model';
import { Draft } from '../draft.model';
import { Player } from '../player.model';
import { Card } from '../card.model';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drafting',
  templateUrl: './drafting.component.html',
  styleUrls: ['./drafting.component.css']
})
export class DraftingComponent implements OnInit {

  constructor(private magicService: MagicService, private route: ActivatedRoute, private location: Location) {
  }

  draftId: string;
  currentDraft;

  ngOnInit() {
    this.route.params.forEach((urlParameters) =>{
      this.draftId = urlParameters['id']
    });
    this.magicService.getDraft(this.draftId).subscribe(data => {
      this.currentDraft = data;
    })
  }

}
