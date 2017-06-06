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
export class EventsListComponent implements OnInit {

  eventsList: Array<string> = [];

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Events - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all news sources
     */
    this.getEvents();
  }

  getEvents() {
    /*
     Get all news sources
     */
    this._apiService.getAllEvents().subscribe(
      data => {
        this.eventsList = this.eventsList.concat(data);
      },
      err => console.error(err),
      () => {
        console.log("Event List data", this.eventsList);
      }
    );
  }
}
