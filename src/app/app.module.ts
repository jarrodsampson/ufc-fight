import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { FightersListComponent } from './fighters/list/list.component';
import { TitleHolderListComponent } from './fighters/title_holders/list.component';
import { EventsListComponent } from './events/list/list.component';
import { EventDetailsComponent } from './events/details/detail.component';
import { NewsComponent } from './news/news.component';
import { OctagonGirlsListComponent } from './octagon/girls/list.component';
import { OctagonGirlDetailsComponent } from './octagon/girls/details/detail.component';
import { FighterDetailsComponent } from './fighters/details/detail.component';
import { MediaListComponent } from './news/media/list.component';
import { MediaDetailsComponent } from './news/media/details/detail.component';

import { AppComponent } from './app.component';

import { MaterializeModule } from 'ng2-materialize';
import {MomentModule} from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlModule } from 'ng2-owl-carousel';
import { TruncateModule } from 'ng2-truncate';
import { Parallax } from './directives/parallax.directive';
import {NgPipesModule} from 'ngx-pipes';
import {BusyModule} from 'angular2-busy';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { RouterModule } from '@angular/router';
import {APP_ROUTES} from './routes';

import { APIService } from './services/APIService';

@NgModule({
  declarations: [
    AppComponent,
    Parallax,
    HomeComponent,
    ErrorComponent,
    FightersListComponent,
    FighterDetailsComponent,
    TitleHolderListComponent,
    EventsListComponent,
    NewsComponent,
    OctagonGirlsListComponent,
    OctagonGirlDetailsComponent,
    EventDetailsComponent,
    MediaListComponent,
    MediaDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    MaterializeModule.forRoot(),
    MomentModule,
    NgxPaginationModule,
    OwlModule,
    TruncateModule,
    NgPipesModule,
    BrowserAnimationsModule,
    BusyModule,
    InfiniteScrollModule,
    ChartsModule
  ],
  providers: [APIService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
