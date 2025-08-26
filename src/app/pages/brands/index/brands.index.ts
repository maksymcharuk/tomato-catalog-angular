import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { Brand } from '../../../api/brands';
import { BrandsApiService } from '../../../services/brands-api.service';

@Component({
  imports: [AsyncPipe, RouterLink],
  templateUrl: './brands.index.html',
  styleUrl: './brands.index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsIndexPage {
  private readonly route = inject(ActivatedRoute);
  private readonly brandsApiService = inject(BrandsApiService);

  protected readonly loading$ = new BehaviorSubject<boolean>(true);
  protected readonly brands$ = this.route.params.pipe(
    takeUntilDestroyed(),
    tap(() => this.loading$.next(true)),
    switchMap(() =>
      this.brandsApiService
        .find()
        .pipe(finalize(() => this.loading$.next(false))),
    ),
    map((response) => response.data),
  );
  protected readonly brandsData$ = combineLatest([
    this.loading$,
    this.brands$,
  ]).pipe(
    startWith<[boolean, Brand[]]>([true, []]),
    map(([loading, brands]) => ({ loading, brands })),
  );
}
