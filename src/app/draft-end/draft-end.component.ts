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
  players;
  currentDraft = this.magicService.getDraft(this.currentDraftId);

  //global variables

  ngOnInit() {
    this.route.params.forEach(urlParameters => {
      this.currentDraftId = urlParameters['id'];
    });
    this.players = this.magicService.getPlayers(this.currentDraftId);
  }


  setArray(cards){
    var output = []
    for(var property in cards){
      console.log(cards[property].imageUrl)
      output.push(cards[property].imageUrl);
    }
    return output;
  }


}
