import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APIService } from '../services/APIService';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList: Array<string> = [];

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "News - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all news sources
     */
    this.getNews();
  }

  getNews() {
    /*
     Get all news sources
     */
    this._apiService.getAllNews().subscribe(
      data => {
        this.newsList = this.newsList.concat(data);
      },
      err => console.error(err),
      () => {
        console.log("News List data", this.newsList);
      }
    );
  }
}
