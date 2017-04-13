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

  //global variables

  ngOnInit() {
    this.route.params.forEach(urlParameters => {
      this.currentDraftId = urlParameters['id'];
    });
    this.magicService.getPlayers(this.currentDraftId).subscribe(data => {
      this.players = data;
      console.log(this.players);
    })
  }


  setArray(cards){
    console.log(cards)
    var output = Array.from(cards);
    console.log(output);
    return output;
  }


}
