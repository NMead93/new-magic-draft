import { Component, OnInit } from '@angular/core';
import { MagicService } from '../magic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-draft-end',
  templateUrl: './draft-end.component.html',
  styleUrls: ['./draft-end.component.css'],
  providers: [MagicService]
})
export class DraftEndComponent implements OnInit {
  constructor(private magicService: MagicService, private route: ActivatedRoute, private location: Location) { }

  //global variables
  currentDraftId: string;
  currentDraft;
  playerArray = [];

  //global variables

  ngOnInit() {
    this.route.params.forEach(urlParameters => {
      this.currentDraftId = urlParameters['id'];
    });
    this.magicService.getDraft(this.currentDraftId).subscribe(data => {
      this.currentDraft = data;
      console.log(this.currentDraft);
      this.setArrayOfPlayers(this.currentDraft);
    });
  }

  setArrayOfPlayers(draft) {
    for(let i = 0; i < draft.players.length; i++){
      this.playerArray.push(draft.players[i]);
    }
    console.log(this.playerArray);
  }

  setArray(cards){
    let output: any[] = [];
    for(let i = 0; i < cards.length; i++) {
      output.push(cards[i]);
    }
    return output;
  }


}
