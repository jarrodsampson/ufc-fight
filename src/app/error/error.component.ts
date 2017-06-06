import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle( "Opps! 404 - UFC Champions" );
  }
}
