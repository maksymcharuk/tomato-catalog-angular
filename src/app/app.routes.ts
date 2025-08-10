import { Routes } from '@angular/router';

import { DEFAULT_LOCALE } from './configs/locales';
import { LocaleGuard } from './guards/locale.guard';

import { BrandsIndexPage } from './pages/brands/index/brands.index';
import { BrandsViewPage } from './pages/brands/view/brands.view';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [LocaleGuard],
    children: [
      { path: 'brands', redirectTo: '', pathMatch: 'full' },
      { path: '', component: BrandsIndexPage },
      { path: 'brands/:id', component: BrandsViewPage },
    ],
  },
  { path: '**', redirectTo: `/${DEFAULT_LOCALE}` },
];
