import { Routes } from '@angular/router';

import { AdminDashboardPage } from './dashboard/dashboard.page';
import { TomatoesCreatePage } from './tomatoes/create/tomatoes.create';
import { TomatoesEditPage } from './tomatoes/edit/tomatoes.edit';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardPage,
    title: 'Панель адміністратора',
  },
  {
    path: 'tomatoes',
    children: [
      {
        path: 'create',
        component: TomatoesCreatePage,
        title: 'Додати томат',
      },
      {
        path: ':id/edit',
        component: TomatoesEditPage,
        title: 'Редагувати томат',
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
