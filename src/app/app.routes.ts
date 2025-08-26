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
      { path: '', component: BrandsIndexPage, title: 'Список брендів | BC' },
      { path: 'brands/:slug', component: BrandsViewPage, title: 'Бренд | BC' },
    ],
  },
  { path: '**', redirectTo: `/${DEFAULT_LOCALE}` },
];
