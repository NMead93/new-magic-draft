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

  generateBooster() {
      return this.http.get("https://api.magicthegathering.io/v1/sets/KLD/booster")
        .map((res:Response) => res.json());
  }

  saveDraft(newDraft: Draft) {
      this.drafts.push(newDraft).then(draft => { this.router.navigate(['draft', draft.key])});
  }

  getBoosters(draftId: string) {
    return this.angularFire.database.list('drafts/' + draftId + '/boosters');
  }

  getCard(packId: string, cardId: string, draftId: string) {
    return this.angularFire.database.object('drafts/' + draftId + '/boosters/' + packId + '/cards/' + cardId);
  }

  addCardToUser(newCard, playerId: string, cardId: string, packId: string, draftId: string) {
    var card = this.getCard(packId, cardId, draftId);
    card.remove();
    var cardList = this.angularFire.database.list('drafts/' + draftId + '/players/' + playerId + '/cards');
    cardList.push(newCard);
  }

  getDraft(id) {
    return this.angularFire.database.object('drafts/' + id);
  }

  // assignPacksToPlayers(){
  //   (i=0; i<)
  // }

}
