import { Component } from '@angular/core';
import { MagicService } from '../magic.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Booster } from '../booster.model';
import { Draft } from '../draft.model';
import { Player } from '../player.model';

@Component({
  selector: 'player-creation-overlay',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MagicService]
})
export class HomeComponent {
    playerNameList: string[] = [];
    playerList: Player[] = [];
    search;
    boosterList: Booster[] = [];

  constructor(private magicService: MagicService) { }

  ngOnInit() {
  }

  addPlayer(name: string) {
    this.playerNameList.push(name);

    console.log(this.playerNameList);
  }

  getBoosters() {
      for(var i = 0; i < this.playerNameList.length * 3; i++) {
          // this.boosterCall();
          this.magicService.getBooster().subscribe(data => {
            this.search = data;
            var freshPack: Booster = new Booster(this.search.cards, i.toString())
            this.boosterList.push(freshPack);
          });
      }
      console.log(this.boosterList);
      console.log(this.playerNameList);
  }

  generateDraft() {
    for(var i = 0; i < this.playerNameList.length; i++) {
      var newPlayer = new Player(this.playerNameList[i], i.toString());
      this.playerList.push(newPlayer);
    }
    var newDraft = new Draft(this.playerList, this.boosterList);
    this.magicService.saveDraft(newDraft);
  }

  showme() {
    console.log(this.boosterList.length);
  }

  boosterCall() {
  }



}
