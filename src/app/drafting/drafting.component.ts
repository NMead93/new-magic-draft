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
  currentPlayerId;
  currentDraft;
  currentBoosterCards;
  selectedCard;
  blurBg: boolean = false;
  infoShowing: boolean = false;

  showInfo() {
      this.infoShowing = true;
      console.log(this.currentDraft)
  }


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
    this.resubscribeDraft();
  }

  beginAddCardToUser(cardId: string) {
    this.magicService.getCard(this.currentPlayer.currentPackId, cardId, this.draftId).subscribe(data => {
      this.magicService.addCardToUser(data, this.currentPlayerId, cardId, this.currentPlayer.currentPackId, this.draftId);
    })
  }

  // turn and pack rotation methods ===================
  initializeGrab(){
    this.currentPlayer = this.currentDraft.players[(this.currentDraft.turns -1) % this.currentDraft.players.length];
    this.currentPlayerId = ((this.currentDraft.turns - 1) % this.currentDraft.players.length).toString();
    // this.currentBoosterCards = this.setBoosterToArray(this.currentDraft.boosters[parseInt(this.currentPlayer.currentPackId)].cards).filter(function(n){ return n != undefined });
    this.magicService.getCurrentBooster(this.draftId, this.currentPlayer.currentPackId).subscribe(data => {
      this.currentBoosterCards = data;
      console.log(this.currentBoosterCards);
      console.log(this.currentPlayer);
    })
  }

  nextGrab() {
    this.currentDraft.turns++;
    this.initializeGrab();
    if(this.endOfTurnCheck()){
      this.passPack()
      this.checkIfEmptyPack();
    }
    this.beginUpdatingDraft();
  }

  endOfTurnCheck() {
    return ((this.currentDraft.turns - 1) % (this.currentDraft.players.length)) === 0;
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
      this.blurBg = true;
  }

  processDetailSelection(decision){
    if(decision === "yes"){
      this.beginUpdatePlayerCardInfo();
      this.beginAddCardToUser(this.selectedCard.cardId);
      this.selectedCard = null;
      this.blurBg = false;
      this.nextGrab();
    }
    else{
      this.selectedCard = null;
      this.blurBg = false;
    }
  }

  checkIfEmptyPack(){
    if (this.currentBoosterCards.length === 0) {
      this.assignPacksToPlayers();
      this.initializeGrab();
      // this.nextGrab();
    }
  }

  setBoosterToArray(booster){
    return Array.from(booster);
  }

  resubscribeDraft() {
    this.magicService.getDraft(this.draftId).subscribe(data => {
      this.currentDraft = data;
      console.log(this.currentDraft);
    });
  }

  hideCard() {
      this.selectedCard = null;
      this.blurBg = false;
  }

  beginUpdatePlayerCardInfo() {
    if (this.selectedCard.type.search('Creature') >= 0) {
      this.currentPlayer.playerInfo.cardType.creature++;
    } else if (this.selectedCard.type.search('Instant') >= 0) {
      this.currentPlayer.playerInfo.cardType.instant++;
    } else if (this.selectedCard.type.search('Planeswalker') >= 0) {
      this.currentPlayer.playerInfo.cardType.planeswalker++;
    } else if (this.selectedCard.type.search('Artifact') >= 0) {
      this.currentPlayer.playerInfo.cardType.artifact++;
    } else if (this.selectedCard.type.search('Enchantment') >= 0) {
      this.currentPlayer.playerInfo.cardType.enchantment++;
    } else if (this.selectedCard.type.search('Sorcery') >= 0) {
      this.currentPlayer.playerInfo.cardType.sorcery++;
    } else {
      this.currentPlayer.playerInfo.cardType.other++;
    }
    console.log(this.currentPlayer.playerInfo.cardType);
    this.magicService.updatePlayerInfo(this.currentPlayer.playerInfo, this.draftId, this.currentPlayerId);
  }


}
