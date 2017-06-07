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
export class MediaListComponent implements OnInit {

  mediaList: Array<string> = [];
  busy: Subscription;
  isLoading: boolean = true;
  mediaLength: number = 18;
  videoDetails = {};
  search = {
    name: ""
  };

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Media Coverage - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all media coverage
     */
    this.getMedia();
  }

  getMedia() {
    /*
     Get all news sources
     */
    this.busy = this._apiService.getAllMediaCoverage().subscribe(
      data => {
        this.mediaList = this.mediaList.concat(data);
      },
      err => console.error(err),
      () => {
        console.log("Media Coverage List data", this.mediaList);
        this.isLoading = false;
      }
    );
  }

  /*
   Increment event listings to save loading space using ngIf and hidden
   */
  loadMoreMedia() {
    this.mediaLength += 10;
  }

  /*
   Route to Event Details
   */
  getMediaDetails(mediaId) {
    this.router.navigate(['./media/' + encodeURI(mediaId)]);
  }
}
