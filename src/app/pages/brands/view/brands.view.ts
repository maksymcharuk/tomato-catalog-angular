import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { BrandsApiService } from '../../../services/brands-api.service';

@Component({
  imports: [CommonModule, TranslatePipe],
  templateUrl: './brands.view.html',
  styleUrl: './brands.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsViewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly brandsApiService = inject(BrandsApiService);

  protected readonly loading$ = new BehaviorSubject<boolean>(true);
  protected readonly brand$ = this.route.params.pipe(
    takeUntilDestroyed(),
    tap(() => this.loading$.next(true)),
    switchMap((params) =>
      this.brandsApiService
        .findOne(params['id'])
        .pipe(finalize(() => this.loading$.next(false))),
    ),
    map((response) => response.data),
  );
  protected readonly brandData$ = combineLatest([
    this.loading$,
    this.brand$,
  ]).pipe(
    startWith([true, undefined]),
    map(([loading, brand]) => ({ loading, brand })),
  );
}
