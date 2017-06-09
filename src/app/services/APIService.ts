import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class APIService {
  constructor(private http:Http) { }

  server = "http://ufc-data-api.ufc.com/api/";

  getAllFighters() {
    return this.http.get(this.server + 'v3/us/fighters').map((res:Response) => res.json());
  }

  getAllEvents() {
    return this.http.get(this.server + 'v3/us/events').map((res:Response) => res.json());
  }

  getAllNews() {
    return this.http.get(this.server + 'v3/news').map((res:Response) => res.json());
  }

  getAllTitleHolders() {
    return this.http.get(this.server + 'v3/iphone/fighters/title_holders').map((res:Response) => res.json());
  }

  getAllOctagonGirls() {
    return this.http.get(this.server + 'v3/iphone/octagon_girls').map((res:Response) => res.json());
  }

  getFighterDetails(fighterId) {
    return Observable.forkJoin(
      this.http.get(this.server + 'v3/us/fighters/' + fighterId + '.json').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/fighters/' + fighterId + '/news').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/fighters/' + fighterId + '/media').map((res:Response) => res.json())
    );
  }

  getEventDetails(eventId) {
    return Observable.forkJoin(
      this.http.get(this.server + 'v3/us/events/' + eventId + '.json').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/events/' + eventId + '/fights').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/events/' + eventId + '/media').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/events/' + eventId + '/tickets.json').map((res:Response) => res.json())
    );
  }

  getAllMediaCoverage() {
    return this.http.get(this.server + 'v3/media').map((res:Response) => res.json());
  }

  getMediaDetails(mediaId) {
    return this.http.get(this.server + 'v3/us/media/' + mediaId).map((res:Response) => res.json());
  }

  getGirlDetails(girlId) {
    return this.http.get(this.server + 'v3/iphone/octagon_girls/' + girlId).map((res:Response) => res.json());
  }

  getHomePageData() {
    return Observable.forkJoin(
      this.http.get('//www.reddit.com/r/ufc/new.json?limit=100').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/iphone/fighters/title_holders').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/fighters').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/us/events').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/iphone/octagon_girls').map((res:Response) => res.json()),
      this.http.get(this.server + 'v3/media').map((res:Response) => res.json())
    );
  }
}
