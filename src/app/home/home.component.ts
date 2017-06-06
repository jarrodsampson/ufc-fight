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
  reddit: Array<string> = [];

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "UFC Champions - Home" );
  }

  ngOnInit() {

    /*
     Get all news sources
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
      },
      err => console.error(err),
      () => {
        console.log("Reddit Data", this.reddit);
      }
    );
  }



}
