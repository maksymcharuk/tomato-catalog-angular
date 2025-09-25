import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FilterBar } from '../../../components/filter-bar/filter-bar.component';
import { BrandsIndexStore } from './brands.index.store';

@Component({
  imports: [RouterLink, FilterBar],
  providers: [BrandsIndexStore],
  templateUrl: './brands.index.html',
  styleUrl: './brands.index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsIndexPage {
  readonly store = inject(BrandsIndexStore);
}
