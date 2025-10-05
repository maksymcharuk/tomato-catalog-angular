import {
  Component,
  ChangeDetectionStrategy,
  input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';
import { ButtonModule } from 'primeng/button';

import { FilterBar } from '../filter-bar/filter-bar.component';
import { AppStore } from '../../store/app.store';
import { LocaleService } from '../../services/locale.service';
import { authEvents } from '../../store/events';

@Component({
  selector: 'app-bar',
  imports: [FilterBar, RouterLink, ButtonModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppBar {
  readonly store = inject(AppStore);
  readonly dispatcher = inject(Dispatcher);
  readonly localeService = inject(LocaleService);

  readonly showFilters = input<boolean>(true);
  readonly isAdminPage = input<boolean>(false);

  readonly adminPanelLink = `/${this.localeService.getLocale()}/admin/dashboard`;
  readonly signInLink = `/${this.localeService.getLocale()}/sign-in`;
  readonly createTomatoLink = `/${this.localeService.getLocale()}/admin/tomatoes/create`;

  onSignOut() {
    this.dispatcher.dispatch(authEvents.logout());
  }
}
