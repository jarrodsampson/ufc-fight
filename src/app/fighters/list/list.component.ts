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
export class FightersListComponent implements OnInit {

  fighterList: Array<string> = [];

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Fighters - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all news sources
     */
    this.getFighters();
  }

  getFighters() {
    /*
     Get all news sources
     */
    this._apiService.getAllFighters().subscribe(
      data => {
        this.fighterList = this.fighterList.concat(data);
      },
      err => console.error(err),
      () => {
        console.log("Fighter List data", this.fighterList);
      }
    );
  }
}
