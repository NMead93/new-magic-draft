import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Booster } from './booster.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Draft } from './draft.model';


@Injectable()
export class MagicService {

  constructor(private http: Http, private angularFire: AngularFire) {
      this.drafts = angularFire.database.list('drafts');
  }

  drafts: FirebaseListObservable<any[]>;

  getBooster() {
      return this.http.get("https://api.magicthegathering.io/v1/sets/KLD/booster")
        .map((res:Response) => res.json());
  }

  saveDraft(newDraft: Draft) {
      this.drafts.push(newDraft);
  }

  clearAllBoosters() {

  }

}
