import { Routes } from '@angular/router';
import { AppLayout } from './layout/app.layout';
import { Home } from './home/home';
import { BasicPage } from './basic/basic';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: Home },
      { path: 'basic', component: BasicPage },
      { path: 'mohpromt', component: Home },
      { path: 'bma', component: Home },
      { path: 'police', component: Home },
      { path: 'chula', component: Home },
      { path: 'hcis', component: Home },
      { path: 'stationmeet', component: Home },
      { path: 'cbh', component: Home },
      { path: 'cuhplus', component: Home },
      { path: 'tuh4all', component: Home },
      { path: 'bma_station', component: Home },
    ]
  }
];
