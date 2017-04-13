import { Component, OnInit } from '@angular/core';
import { MagicService } from '../magic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [MagicService]
})
export class HistoryComponent implements OnInit {

  constructor(private magicService: MagicService, private router: Router) { }

  allDrafts;

  ngOnInit() {
    this.allDrafts = this.magicService.getAllDrafts();
  }

  goToDraft(key){
    console.log(key);
    this.router.navigate(['draft/', key])
  }

  // setArray(drafts){
  //   var output = []
  //   for(var property in drafts){
  //     console.log(cards[property].imageUrl)
  //     output.push(cards[property].imageUrl);
  //   }
  //   return output;
  // }

}
