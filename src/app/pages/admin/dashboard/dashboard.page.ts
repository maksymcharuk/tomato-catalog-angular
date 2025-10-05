import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

import { AppBar } from '../../../components/app-bar/app-bar.component';
import { DashboardPageStore } from './dashboard.page.store';
import { LocaleService } from '../../../services/locale.service';

@Component({
  imports: [RouterLink, AppBar, TableModule],
  providers: [DashboardPageStore],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminDashboardPage {
  readonly localeService = inject(LocaleService);
  readonly store = inject(DashboardPageStore);

  getTomatoEditLink(tomatoId: string) {
    return [
      '/',
      this.localeService.getLocale(),
      'admin',
      'tomatoes',
      tomatoId,
      'edit',
    ];
  }
}
