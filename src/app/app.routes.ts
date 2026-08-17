import { Route } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { WorkPage } from './components/work-page/work-page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'work/:id',
    component: WorkPage,
  },
  {
    path: '**',
    component: MainPage,
  },
];
