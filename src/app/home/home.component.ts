import { Component } from '@angular/core';
import { MagicService } from '../magic.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Booster } from '../booster.model';
import { Draft } from '../draft.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MagicService]
})
export class HomeComponent {
    playerList: string[] = [];
    search;
    boosterList: Booster[] = [];

  constructor(private magicService: MagicService) { }

  ngOnInit() {
  }

  addPlayer(name: string) {
    this.playerList.push(name);
    // console.log(this.playerList.length);
  }

  getBoosters() {
      for(var i = 0; i < this.playerList.length * 3; i++) {
          // this.boosterCall();
          this.magicService.getBooster().subscribe(data => {
            this.search = data;
            var freshPack: Booster = new Booster(this.search.cards)
            this.boosterList.push(freshPack);
          });
      }
      console.log(this.boosterList);
      console.log(this.playerList);
  }

  showme() {
    console.log(this.boosterList.length);
  }

  boosterCall() {
  }

}
