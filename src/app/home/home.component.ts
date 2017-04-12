import { Component } from '@angular/core';
import { MagicService } from '../magic.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Booster } from '../booster.model';
import { Draft } from '../draft.model';
import { Player } from '../player.model';
import { Card } from '../card.model';

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
    cardHolder: Card;
    loadingCards: boolean = false;

  constructor(private magicService: MagicService) { }

  ngOnInit() {
  }

  addPlayer(name: string) {
    this.playerNameList.push(name);

    console.log(this.playerNameList);
  }

  getBoosters(setOption: string) {
      this.loadingCards = true;
      setTimeout(() => {
          this.loadingCards = false;
          this.generateDraft();
      }, 2500);

      for(var i = 0; i < this.playerNameList.length * 3; i++) {
          // this.boosterCall();
          this.magicService.generateBooster(setOption).subscribe(data => {
            this.search = data;
            var freshPack: Booster = new Booster(this.search.cards)
            for (var i = 0; i < freshPack.cards.length; i++) {
              freshPack.cards[i].cardId = i.toString();
            }
            this.boosterList.push(freshPack);
          });
        //   if (this.boosterList.count === this.playerNameList.length*3){
        //       //   then remove class for animation here
        //   }
        //   route to next page
      }
      console.log(this.boosterList);
      console.log(this.playerNameList);
  }

  generateDraft() {
     this.loadingCards = true;
    for(var i = 0; i < this.playerNameList.length; i++) {
      var newPlayer = new Player(this.playerNameList[i], i.toString());
      this.playerList.push(newPlayer);
    }
    setTimeout(() => {
        this.loadingCards = false;
        var newDraft = new Draft(this.playerList, this.boosterList);
        this.magicService.saveDraft(newDraft);
}, 5000);
}




  showme() {
    console.log(this.boosterList.length);
  }



}
