import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

import { BrandsApiService } from '../../../services/brands-api.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [AsyncPipe, RouterLink],
  templateUrl: './brands.index.html',
  styleUrl: './brands.index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsIndexPage {
  private readonly brandsApiService = inject(BrandsApiService);

  protected readonly brands$ = this.brandsApiService
    .find()
    .pipe(map((response) => response.data));
}
