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
export class OctagonGirlDetailsComponent implements OnInit {

  girlId: string = "";
  girl = {
    first_name: "",
    gallery: []
  };
  busy: Subscription;

  constructor(private _apiService: APIService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle( "RingSide - Octagon Girls - UFC Champions" );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.girlId = params['girlId'];
      console.log(this.girlId);
    });


    /*
     Get all news sources
     */
    this.getGirlDetail();
  }

  getGirlDetail() {
    /*
     Get all news sources
     */
    this.busy = this._apiService.getGirlDetails(this.girlId).subscribe(
      data => {
        this.girl = data;
      },
      err => console.error(err),
      () => {
        this.titleService.setTitle( this.girl.first_name + ' - Octagon Girls - UFC Champions' );
        console.log("girl data", this.girl);
      }
    );
  }

  goBack() {
      window.history.back();
  }
}
