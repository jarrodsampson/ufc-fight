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
export class TitleHolderListComponent implements OnInit {

  titleHoldersList: Array<any> = [];
  originalTitleHoldersList: Array<any> = [];
  titles: Array<any> = [];
  busy: Subscription;
  search = {
    name: ""
  };
  isLoading: boolean = true;
  selectedTitle: string = "";

  constructor(private _apiService: APIService, private _apiLocalService: LocalService, private titleService: Title, private router: Router) {
    this.titleService.setTitle( "Title Holders - UFC Champions" );
  }

  ngOnInit() {
    /*
     Get all title holders
     */
    this.getTitleHolders();

    /*
     Get all titles
     */
    this.getTitles();
  }

  getTitleHolders() {
    this._apiService.getAllTitleHolders().subscribe(
      data => {
        this.titleHoldersList = _.shuffle(this.titleHoldersList.concat(data));
        this.originalTitleHoldersList = this.titleHoldersList;
      },
      err => console.error(err),
      () => {
        console.log("Title Holder List data", this.titleHoldersList);
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

  getFighterDetail(fighterId) {
      this.router.navigate(['./fighter/' + encodeURI(fighterId)]);
  }

  onSearchTitle(title) {
    this.selectedTitle = title.title;
    this.titleHoldersList = this.originalTitleHoldersList;
    this.titleHoldersList = _.where(this.titleHoldersList, {weight_class: title.id});
  }
}
