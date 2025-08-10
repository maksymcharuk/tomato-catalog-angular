import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { BrandsApiService } from '../../../services/brands-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommonModule],
  templateUrl: './brands.view.html',
  styleUrl: './brands.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsViewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly brandsApiService = inject(BrandsApiService);

  protected readonly brand$ = this.brandsApiService
    .findOne(this.route.snapshot.params['id'])
    .pipe(map((response) => response.data));

  constructor() {
    this.brand$.subscribe((brand) => {
      console.log('Brand loaded:', brand);
    });
  }
}
