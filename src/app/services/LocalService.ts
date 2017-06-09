import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
@Injectable()
export class LocalService {
  constructor(private http:Http) { }

  getTitles() {
    return this.http.get('assets/local/titles.json').map((res:Response) => res.json());
  }

}
