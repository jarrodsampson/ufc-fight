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
  eventsLength: number = 14;
  loadMoreEventsShown: boolean = true;
  search = {
    name: ""
  };
  isLoading: boolean = true;
  busy: Subscription;

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Events - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all event listings
     */
    this.getEvents();
  }

  getEvents() {
    /*
     Get all event listings
     */
    this.busy = this._apiService.getAllEvents().subscribe(
      data => {
        this.eventsList = this.eventsList.concat(data);
      },
      err => console.error(err),
      () => {
        console.log("Event List data", this.eventsList);
        this.isLoading = false;
      }
    );
  }

  /*
    Increment event listings to save loading space using ngIf and hidden
   */
  loadMoreEvents() {
      this.eventsLength += 20;
      if (this.eventsLength >= this.eventsList.length) {
        this.loadMoreEventsShown = false;
      }
  }

  /*
    Route to Event Details
   */
  getEventDetails(eventId) {
    this.router.navigate(['./event/' + encodeURI(eventId)]);
  }
}
