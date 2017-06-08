import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APIService } from '../../services/APIService';
import { LocalService } from '../../services/LocalService';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {Subscription} from "rxjs";
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class FightersListComponent implements OnInit {

  fighterList: Array<any> = [];
  originalFighterList: Array<any> = [];
  titles: Array<any> = [];
  numberL: number = 24;
  busy: Subscription;
  search = {
    name: ""
  };
  isLoading: boolean = true;
  selectedTitle: string = "";
  selectedStatus: string = "";
  searchObj = {
    weight_class: "",
    fighter_status: ""
  };

  constructor(private _apiService: APIService, private _apiLocalService: LocalService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Fighters - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all news sources
     */
    this.getFighters();

    /*
     Get all titles
     */
    this.getTitles();
  }

  getFighters() {
    /*
     Get all news sources
     */
    this.busy = this._apiService.getAllFighters().subscribe(
      data => {
        this.fighterList = _.shuffle(this.fighterList.concat(data));
        this.originalFighterList = this.fighterList;
      },
      err => console.error(err),
      () => {
        console.log("Fighter List data", this.fighterList);
        this.isLoading = false;
      }
    );
  }

  getTitles() {
    this.busy = this._apiLocalService.getTitles().subscribe(
      data => {
        this.titles = _.sortBy(data, 'title');
      },
      err => console.error(err),
      () => {
        console.log("Titles data", this.titles);
        this.isLoading = false;
      }
    );
  }

  getMoreFighters() {
    this.numberL += 24;
  }

  getFighterDetail(fighterId) {
    this.router.navigate(['./fighter/' + encodeURI(fighterId)]);
  }

  onSearchTitle(title) {
    this.selectedTitle = title.title;
    this.searchObj.weight_class = title.id;
    this.fighterList = this.originalFighterList;
    console.log(this.searchObj);
    this.fighterList = _.filter(this.fighterList,
      item => {
        return item.weight_class === this.searchObj.weight_class &&
               item.fighter_status === (this.searchObj.fighter_status || "Active");
    });

    if (this.searchObj.fighter_status.length <= 0) {
      this.selectedStatus = "Active";
    }

    //this.fighterList = _.where(this.fighterList, this.searchObj);
  }

  onSearchStatus(status) {
    this.selectedStatus = status;
    this.searchObj.fighter_status = status;
    this.fighterList = this.originalFighterList;
    console.log(this.searchObj);
    this.fighterList = _.filter(this.fighterList,
      item => {
        return item.weight_class === (this.searchObj.weight_class || "Lightweight") &&
               item.fighter_status === this.searchObj.fighter_status;
    });
    //this.fighterList = _.where(this.fighterList, this.searchObj);
  }

  onSearchClear() {
    this.selectedStatus = "";
    this.selectedTitle = "";
    this.search.name = "";
    //this.searchObj = {};
    this.searchObj.weight_class = "";
    this.searchObj.fighter_status = "";
    this.fighterList = this.originalFighterList;
  }
}
