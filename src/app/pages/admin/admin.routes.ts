import { Routes } from '@angular/router';

import { AdminDashboardPage } from './dashboard/dashboard.page';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardPage,
    title: 'Панель адміністратора',
  },
  { path: '**', redirectTo: 'dashboard' },
];
