import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Dispatcher } from '@ngrx/signals/events';

import { AppStore } from '../../../store/app.store';
import { brandsEvents } from '../../../store/events';

@Component({
  imports: [CommonModule, TranslatePipe],
  templateUrl: './brands.view.html',
  styleUrl: './brands.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsViewPage {
  private readonly dispatcher = inject(Dispatcher);
  private readonly title = inject(Title);
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(AppStore);

  constructor() {
    this.route.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.dispatcher.dispatch(brandsEvents.loadBrand(params['slug']));
    });

    effect(() => {
      const brand = this.store.brand();
      if (brand) {
        this.title.setTitle(`${brand.name} - BC`);
      } else {
        this.title.setTitle('Brand Not Found - Brands Catalog');
      }
    });
  }
}
