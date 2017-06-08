import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APIService } from '../services/APIService';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  busy: Subscription;
  isLoading: boolean = false;
  reddit: Array<any> = [];
  champions: Array<any> = [];
  fotw: Array<any> = [];
  events: Array<any> = [];
  ladies: Array<any> = [];
  p: number = 1;
  p1: number = 1;

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "UFC Champions - Home" );
  }

  ngOnInit() {

    /*
     Get all homepage data
     */
    this.getHomepageData();

  }


  getHomepageData() {
    /*
     Get first homepage articles
     */
    this.busy = this._apiService.getHomePageData().subscribe(
      data => {
        this.reddit = data[0].data.children;
        this.champions = _.shuffle(data[1]);
        this.fotw = _.sample(data[2], 10);
        this.events = data[3];
        this.ladies = data[4];
      },
      err => console.error(err),
      () => {
        console.log("Reddit Data", this.reddit);
      }
    );
  }



}
