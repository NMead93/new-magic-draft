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

  constructor(private magicService: MagicService, private route: ActivatedRoute, private location: Location, private router: Router) {
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
      this.blurBg = true;
      console.log(this.currentPlayer)
  }
  hideInfo() {
      this.infoShowing = false;
      this.blurBg = false;
      console.log(this.currentPlayer)
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
    })
  }

  nextGrab() {
    this.currentDraft.turns++;
    this.initializeGrab();
    console.log(this.endOfTurnCheck());
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
    console.log("in pass Pack");
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
  checkEndOfDraft() {
    return parseInt(this.currentDraft.players[0].currentPackId) >= (this.currentDraft.players.length * 3);
  }

  assignPacksToPlayers() {
    this.currentDraft.rounds++;
    for (var i = 0; i < this.currentDraft.players.length; i++) {
      this.currentDraft.players[i].currentPackId = (i + (this.currentDraft.players.length * this.currentDraft.rounds)).toString();
    }
    console.log("in assignPack")
    if (this.checkEndOfDraft()) {
      this.router.navigate(['draft/draft-end', this.draftId]);
    }
    this.beginUpdatingDraft();
  }

  displayCard(card) {
      this.selectedCard = card;
      this.blurBg = true;
  }

  processDetailSelection(decision){
    if(decision === "yes"){
      this.beginUpdatePlayerCardType();
      this.beginUpdatePlayerManaCurve();
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
      console.log("empty booster");
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
    });
  }

  hideCard() {
      this.selectedCard = null;
      this.blurBg = false;
  }


  beginUpdatePlayerCardType() {
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
    this.magicService.updatePlayerInfo(this.currentPlayer.playerInfo, this.draftId, this.currentPlayerId);
  }

  beginUpdatePlayerManaCurve() {
    let manaCount: number = 0;
    if (this.selectedCard.manaCost) {
      if (this.selectedCard.manaCost.includes('1')) {
        manaCount += 1;
      }
      if (this.selectedCard.manaCost.includes('2')) {
        manaCount += 2;
      }
      if (this.selectedCard.manaCost.includes('3')) {
        manaCount += 3;
      }
      if (this.selectedCard.manaCost.includes('4')) {
        manaCount += 4;
      }
      if (this.selectedCard.manaCost.includes('5')) {
        manaCount += 5;
      }
      if (this.selectedCard.manaCost.includes('6')) {
        manaCount += 6;
      }
      if (this.selectedCard.manaCost.includes('7')) {
        manaCount += 7;
      }
      if (this.selectedCard.manaCost.includes('8')) {
        manaCount += 8;
      }
      if (this.selectedCard.manaCost.includes('9')) {
        manaCount += 9;
      }
      if (this.selectedCard.manaCost.includes('10')) {
        manaCount += 10;
      }
      if (this.selectedCard.manaCost.includes('11')) {
        manaCount += 11;
      }
      if (this.selectedCard.manaCost.includes('12')) {
        manaCount += 12;
      }
      for (var i = 0; i < this.selectedCard.manaCost.length; i++) {
        if (this.selectedCard.manaCost.charAt(i) === 'W' || this.selectedCard.manaCost.charAt(i) === 'U' || this.selectedCard.manaCost.charAt(i) === 'B' || this.selectedCard.manaCost.charAt(i) === 'R' || this.selectedCard.manaCost.charAt(i) === 'G') {
          manaCount++;
        }
      }
      if (manaCount === 1) {
        this.currentPlayer.playerInfo.manaCurve.one++;
      } else if (manaCount === 2) {
        this.currentPlayer.playerInfo.manaCurve.two++;
      } else if (manaCount === 3) {
        this.currentPlayer.playerInfo.manaCurve.three++;
      } else if (manaCount === 4) {
        this.currentPlayer.playerInfo.manaCurve.four++;
      } else if (manaCount === 5) {
        this.currentPlayer.playerInfo.manaCurve.five++;
      } else {
        this.currentPlayer.playerInfo.manaCurve.sixAndUp++;
      }
      this.magicService.updatePlayerInfo(this.currentPlayer.playerInfo, this.draftId, this.currentPlayerId);
    }
  }


}
