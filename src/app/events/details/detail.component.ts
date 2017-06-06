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
export class EventDetailsComponent implements OnInit {

  eventId: string = "";
  event = {
    arena: ""
  };
  fightList: Array<string> = [];
  mediaList: Array<string> = [];
  ticketList: Array<string> = [];

  constructor(private _apiService: APIService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle( "Events - UFC Champions" );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventId = params['eventId'];
      console.log(this.eventId);
    });


    /*
     Get all news sources
     */
    this.getEventDetail();
  }

  getEventDetail() {
    /*
     Get all news sources
     */
    this._apiService.getEventDetails(this.eventId).subscribe(
      data => {
        this.event = data[0];
        this.fightList = data[1];
        this.mediaList = data[2];
        this.ticketList = data[3];
      },
      err => console.error(err),
      () => {
        this.titleService.setTitle( this.event.arena + ' Event - UFC Champions' );
        console.log("Event data", this.event);
        console.log("Event Fight data", this.fightList);
        console.log("Event Media data", this.mediaList);
        console.log("Event Ticket data", this.ticketList);
      }
    );
  }
}
