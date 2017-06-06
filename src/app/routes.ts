import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { FightersListComponent } from './fighters/list/list.component';
import { FighterDetailsComponent } from './fighters/details/detail.component';
import { TitleHolderListComponent } from './fighters/title_holders/list.component';
import { EventsListComponent } from './events/list/list.component';
import { EventDetailsComponent } from './events/details/detail.component';
import { NewsComponent } from './news/news.component';
import { MediaListComponent } from './news/media/list.component';
import { MediaDetailsComponent } from './news/media/details/detail.component';
import { OctagonGirlsListComponent } from './octagon/girls/list.component';
import { OctagonGirlDetailsComponent } from './octagon/girls/details/detail.component';

export const APP_ROUTES = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'fighters',
    component: FightersListComponent,
    pathMatch: 'full'
  },
  {
    path: 'fighter/:fighterId',
    component: FighterDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'fighters/title-holders',
    component: TitleHolderListComponent,
    pathMatch: 'full'
  },
  {
    path: 'octagon/ladies',
    component: OctagonGirlsListComponent,
    pathMatch: 'full'
  },
  {
    path: 'octagon/ladies/:girlId',
    component: OctagonGirlDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsListComponent,
    pathMatch: 'full'
  },
  {
    path: 'event/:eventId',
    component: EventDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsComponent,
    pathMatch: 'full'
  },
  {
    path: 'media',
    component: MediaListComponent,
    pathMatch: 'full'
  },
  {
    path: 'media/:mediaId',
    component: MediaDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'error404',
    component: ErrorComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error404'
  }
];
