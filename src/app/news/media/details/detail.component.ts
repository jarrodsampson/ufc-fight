import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APIService } from '../../../services/APIService';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class MediaDetailsComponent implements OnInit {

  mediaId: string = "";
  media = {
    title: ""
  };

  constructor(private _apiService: APIService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle( "Media - UFC Champions" );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.mediaId = params['mediaId'];
      console.log(this.mediaId);
    });


    /*
     Get all news sources
     */
    this.getMediaDetail();
  }

  getMediaDetail() {
    /*
     Get all news sources
     */
    this._apiService.getMediaDetails(this.mediaId).subscribe(
      data => {
        this.media = data;
      },
      err => console.error(err),
      () => {
        this.titleService.setTitle( this.media.title + ' - UFC Champions' );
        console.log("media data", this.media);
      }
    );
  }
}
