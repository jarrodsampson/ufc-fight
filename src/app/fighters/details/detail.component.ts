import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APIService } from '../../services/APIService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class FighterDetailsComponent implements OnInit {

  fighterId: string = "";
  fighter = {
    last_name: "",
    fights: [
      {Event: "",
      Opponent: "",
      Result: ""}
    ]
  };

  fighterNews: Array<string> = [];
  fighterMedia: Array<string> = [];
  busy: Subscription;
  newsLength: number = 10;
  mediaLength: number = 10;
  loadMoreMediaShown: boolean = true;
  loadMoreNewsShown: boolean = true;

  constructor(private _apiService: APIService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle( "Fighters - UFC Champions" );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.fighterId = params['fighterId'];
      console.log(this.fighterId);
    });

    /*
     Get all news sources
     */
    this.getFighterDetail();
  }

  getFighterDetail() {
    /*
     Get all news sources
     */
    this.busy = this._apiService.getFighterDetails(this.fighterId).subscribe(
      data => {
        this.fighter = data[0];
        this.fighterNews = data[1];
        this.fighterMedia = data[2];
      },
      err => console.error(err),
      () => {
        this.titleService.setTitle( this.fighter.last_name + ' - UFC Champions' );
        console.log("Fighter data", this.fighter);
        console.log("Fighter News data", this.fighterNews);
        console.log("Fighter Media data", this.fighterMedia);
      }
    );
  }

  goBack() {
    window.history.back();
  }

  loadMoreMedia() {

    this.mediaLength += 10;
    if (this.mediaLength >= this.fighterMedia.length) {
      this.loadMoreMediaShown = false;
    }
  }

  loadMoreNews() {
    this.newsLength += 10;
    if (this.newsLength >= this.fighterNews.length) {
      this.loadMoreNewsShown = false;
    }
  }
}
