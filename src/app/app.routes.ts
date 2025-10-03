import { Routes } from '@angular/router';

import { DEFAULT_LOCALE } from './configs/locales';
import { LocaleGuard } from './guards/locale.guard';

import { TomatoesIndexPage } from './pages/tomatoes/index/tomatoes.index';
import { TomatoesViewPage } from './pages/tomatoes/view/tomatoes.view';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [LocaleGuard],
    children: [
      { path: 'tomatoes', redirectTo: '', pathMatch: 'full' },
      { path: '', component: TomatoesIndexPage, title: 'Список томатів' },
      {
        path: 'tomatoes/:slug',
        component: TomatoesViewPage,
        title: 'Томат',
      },
    ],
  },
  { path: '**', redirectTo: `/${DEFAULT_LOCALE}` },
];
