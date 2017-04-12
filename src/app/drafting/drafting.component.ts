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
  styleUrls: ['./drafting.component.css'],
  providers: [MagicService]
})
export class DraftingComponent implements OnInit {

  constructor(private magicService: MagicService, private route: ActivatedRoute, private location: Location) {
  }

  draftId: string;
  currentPlayer;
  currentDraft;
  currentBoosterCards;
  selectedCard;


  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.draftId = urlParameters['id'];
    });
    this.magicService.getDraft(this.draftId).subscribe(data => {
      this.currentDraft = data;
      this.initializeGrab();
    })
  }

  beginUpdatingDraft() {
    this.magicService.updateDraft(this.currentDraft, this.draftId);
  }

  beginAddCardToUser(cardId: string) {
    var playerId = ((this.currentDraft.turns - 1) % this.currentDraft.players.length).toString();
    this.magicService.getCard(this.currentPlayer.currentPackId, cardId, this.draftId).subscribe(data => {
      this.magicService.addCardToUser(data, playerId, cardId, this.currentPlayer.currentPackId, this.draftId);
    })
  }

  // turn and pack rotation methods ===================
  initializeGrab(){
    this.currentPlayer = this.currentDraft.players[(this.currentDraft.turns -1) % this.currentDraft.players.length];
    this.currentBoosterCards = this.currentDraft.boosters[parseInt(this.currentPlayer.currentPackId)].cards;
  }

  nextGrab() {
    this.currentDraft.turns++;
    this.initializeGrab();
    if(this.endOfTurnCheck()){
      this.passPack();
      this.beginUpdatingDraft();
    }
    console.log(this.currentPlayer.name, this.currentPlayer.currentPackId);
  }

  endOfTurnCheck() {
    return (this.currentDraft.turns % this.currentDraft.players.length) === 0;
  }

  passPack() {
    var packIdArr: string[] = [];
    for (var i = 0; i < this.currentDraft.players.length; i++) {
      packIdArr.push(this.currentDraft.players[i].currentPackId);
    }
    for (var i = 0; i < this.currentDraft.players.length; i++) {
      this.currentDraft.players[i].currentPackId = packIdArr[(i + 1) % this.currentDraft.players.length];
    }
    this.beginUpdatingDraft();
  }

  //end turn and pack rotation methods ===================

  assignPacksToPlayers() {
    this.currentDraft.rounds++;
    for (var i = 0; i < this.currentDraft.players.length; i++) {
      this.currentDraft.players[i].currentPackId = (i + (this.currentDraft.players.length * this.currentDraft.rounds)).toString();
    }
    this.beginUpdatingDraft();
  }

  displayCard(card) {
      this.selectedCard = card;
  }

}
