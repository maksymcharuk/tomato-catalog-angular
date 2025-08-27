import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';

import { AppStore } from '../../../store/app.store';
import { brandsEvents } from '../../../store/events';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [RouterLink],
  templateUrl: './brands.index.html',
  styleUrl: './brands.index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsIndexPage {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly dispatcher = inject(Dispatcher);
  readonly store = inject(AppStore);

  constructor() {
    this.route.params.subscribe(() => {
      this.dispatcher.dispatch(brandsEvents.loadBrands());
    });

    effect(() => {
      const locale = this.store.locale();
      const title = locale === 'uk' ? 'Список Брендів' : 'Brands List';
      this.title.setTitle(`${title} - BC`);
    });
  }
}
