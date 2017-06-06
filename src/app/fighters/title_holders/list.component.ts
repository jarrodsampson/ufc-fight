import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APIService } from '../../services/APIService';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TitleHolderListComponent implements OnInit {

  titleHoldersList: Array<string> = [];
  busy: Subscription;

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Title Holders - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all title holders
     */
    this.getTitleHolders();
  }

  getTitleHolders() {
    /*
     Get all news sources
     */
    this.busy = this._apiService.getAllTitleHolders().subscribe(
      data => {
        this.titleHoldersList = this.titleHoldersList.concat(data);
      },
      err => console.error(err),
      () => {
        console.log("Title Holder List data", this.titleHoldersList);
      }
    );
  }

  getFighterDetail(fighterId) {
      this.router.navigate(['./fighter/' + encodeURI(fighterId)]);
  }
}
