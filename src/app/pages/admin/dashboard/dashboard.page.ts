import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';
import { TableModule } from 'primeng/table';

import { AppBar } from '../../../components/app-bar/app-bar.component';
import { DashboardPageStore } from './dashboard.page.store';
import { LocaleService } from '../../../services/locale.service';
import { ButtonModule } from 'primeng/button';
import { tomatoesEvents } from '../../../store/events';

@Component({
  imports: [RouterLink, AppBar, TableModule, ButtonModule],
  providers: [DashboardPageStore],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminDashboardPage {
  private readonly dispatcher = inject(Dispatcher);
  readonly localeService = inject(LocaleService);
  readonly store = inject(DashboardPageStore);

  readonly createTomatoLink = `/${this.localeService.getLocale()}/admin/tomatoes/create`;

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

  importTomatoes() {
    this.dispatcher.dispatch(tomatoesEvents.importTomatoes());
  }

  generateLabels() {
    this.dispatcher.dispatch(tomatoesEvents.generateLabels(undefined));
  }
}
