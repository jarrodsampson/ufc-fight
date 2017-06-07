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
export class OctagonGirlsListComponent implements OnInit {

  ladiesList: Array<any> = [];
  isLoading: boolean = true;
  busy: Subscription;
  search = {
    name: ""
  };

  constructor(private _apiService: APIService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "RingSide - Octagon Girls - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all octagon girls
     */
    this.getOctGirls();
  }

  getOctGirls() {
    /*
     Get all news sources
     */
    this.busy = this._apiService.getAllOctagonGirls().subscribe(
      data => {
        this.ladiesList = _.shuffle(this.ladiesList.concat(data));
      },
      err => console.error(err),
      () => {
        console.log("Ladies List data", this.ladiesList);
        this.isLoading = false;
      }
    );
  }

  getGirlDetail(girlId) {
     this.router.navigate(['./octagon/ladies/' + encodeURI(girlId)]);
  }
}
