import { Component, OnInit } from '@angular/core';
import { MagicService } from '../magic.service';

@Component({
  selector: 'app-draft-end',
  templateUrl: './draft-end.component.html',
  styleUrls: ['./draft-end.component.css'],
  providers: [MagicService]
})
export class DraftEndComponent implements OnInit {
  constructor(private magicService: MagicService) { }

  ngOnInit() {
  }




}
