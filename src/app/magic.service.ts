import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Booster } from './booster.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Draft } from './draft.model';
import { Card } from './card.model';
import { Router } from '@angular/router';


@Injectable()
export class MagicService {
  constructor(private http: Http, private angularFire: AngularFire, private router: Router) {
      this.drafts = angularFire.database.list('drafts');
  }

  roundModifier: number = 0;

  drafts: FirebaseListObservable<any[]>;

  generateBooster(setOption: string) {
      return this.http.get("https://api.magicthegathering.io/v1/sets/" + setOption + "/booster")
        .map((res:Response) => res.json());
  }

  saveDraft(newDraft: Draft) {
      this.drafts.push(newDraft).then(draft => { this.router.navigate(['draft', draft.key])});
  }

  getAllDrafts() {
    return this.angularFire.database.list('drafts');
  }

  getBoosters(draftId: string) {
    return this.angularFire.database.list('drafts/' + draftId + '/boosters');
  }

  getCard(packId: string, cardId: string, draftId: string) {
    return this.angularFire.database.object('drafts/' + draftId + '/boosters/' + packId + '/cards/' + cardId);
  }

  addCardToUser(newCard, playerId: string, cardId: string, packId: string, draftId: string) {
    delete newCard.$key;
    delete newCard.$value;
    var card = this.getCard(packId, cardId, draftId);
    card.remove();
    var cardList = this.angularFire.database.list('drafts/' + draftId + '/players/' + playerId + '/cards');
    cardList.push(newCard);
  }

  getCurrentBooster(draftId: string, boosterId: string) {
    return this.angularFire.database.list('drafts/' + draftId + '/boosters/' + boosterId + '/cards');
  }

  getDraft(id) {
    return this.angularFire.database.object('drafts/' + id);
  }

  getPlayers(draftId: string) {
    return this.angularFire.database.list('drafts/' + draftId + '/players');
  }

  updateDraft(draftToUpdate, id) {
    var draft = this.getDraft(id);
    if (draftToUpdate.boosters) {
      draft.update({
        boosters: draftToUpdate.boosters,
        players: draftToUpdate.players,
        turns: draftToUpdate.turns,
        rounds: draftToUpdate.rounds
      });
    } else {
      draft.update({
        players: draftToUpdate.players,
        turns: draftToUpdate.turns,
        rounds: draftToUpdate.rounds
      });
    }
  }

  //Functions for dealing with player info==================
  getPlayerInfo(draftId: string, playerId: string) {
      return this.angularFire.database.object('drafts/' + draftId + '/players/' + playerId + '/playerInfo');
  }

  updatePlayerInfo(newPlayerInfo, draftId: string, playerId: string) {
      var playerInfo = this.getPlayerInfo(draftId, playerId);
      playerInfo.update({
        cardType: newPlayerInfo.cardType,
        manaCurve: newPlayerInfo.manaCurve
      });
  }

}
