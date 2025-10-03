import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FilterBar } from '../../../components/filter-bar/filter-bar.component';
import { TomatoesIndexStore } from './tomatoes.index.store';

@Component({
  imports: [RouterLink, FilterBar],
  providers: [TomatoesIndexStore],
  templateUrl: './tomatoes.index.html',
  styleUrl: './tomatoes.index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoesIndexPage {
  readonly store = inject(TomatoesIndexStore);
}
