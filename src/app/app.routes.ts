import { Routes } from '@angular/router';

import { DEFAULT_LOCALE } from './configs/locales';
import { LocaleGuard } from './guards/locale.guard';
import { SignedInGuard } from './guards/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out.guard';

import { SignInPage } from './pages/auth/sign-in/sign-in.page';
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
      {
        path: 'admin',
        canActivate: [SignedInGuard], // Protect the admin routes
        loadChildren: () =>
          import('./pages/admin/admin.routes').then((m) => m.routes),
      },
      {
        path: 'sign-in',
        canActivate: [SignedOutGuard],
        component: SignInPage,
        title: 'Вхід',
      },
    ],
  },
  { path: '**', redirectTo: `/${DEFAULT_LOCALE}` },
];
