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
  tickets = {};
  busy: Subscription;
  isLoading: boolean = true;
  fightDetails = {};
  zoom = 12; // initial zoom
  numberL: number = 5;
  loadMoreMediaShown: boolean = true;

  constructor(private _apiService: APIService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle( "Events - UFC Champions" );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventId = params['eventId'];
      console.log(this.eventId);
    });


    /*
     Get event detail function
     */
    this.getEventDetail();
  }

  getEventDetail() {
    /*
     Get event details from all sources
     */
    this.busy = this._apiService.getEventDetails(this.eventId).subscribe(
      data => {
        this.event = data[0];
        this.fightList = data[1];
        this.mediaList = data[2];
        this.tickets = data[3];
      },
      err => console.error(err),
      () => {
        this.titleService.setTitle( this.event.arena + ' Event - UFC Champions' );
        console.log("Event data", this.event);
        console.log("Event Fight data", this.fightList);
        console.log("Event Media data", this.mediaList);
        console.log("Event Ticket data", this.tickets);
        this.isLoading = false;
        if (this.numberL >= this.mediaList.length) {
          this.loadMoreMediaShown = false;
        }
      }
    );
  }

  /*
   Native back button functionality
   */
  goBack() {
    window.history.back();
  }

  /*
   Modal Popup Detail transfer
   */
  loadFightDetails(fight) {
    this.fightDetails = fight;
    console.log(fight);
  }

  /*
   Increment event listings to save loading space using ngIf and hidden
   */
  loadMoreMedia() {

    this.numberL += 10;
    if (this.numberL >= this.mediaList.length) {
      this.loadMoreMediaShown = false;
    }
  }
}
