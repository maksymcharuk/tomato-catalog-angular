import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { Brand } from '../../../api/brands';
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
  private readonly title = inject(Title);
  private readonly brandsApiService = inject(BrandsApiService);

  protected readonly loading$ = new BehaviorSubject<boolean>(true);
  protected readonly brand$ = this.route.params.pipe(
    takeUntilDestroyed(),
    tap(() => this.loading$.next(true)),
    switchMap((params) =>
      this.brandsApiService
        .findBySlug(params['slug'])
        .pipe(finalize(() => this.loading$.next(false))),
    ),
    map((response) => {
      const [brand] = response.data as Brand[];
      return brand;
    }),
    tap((brand) => {
      if (!brand) return;
      this.title.setTitle(`${brand.name} | BC`);
    }),
  );
  protected readonly brandData$ = combineLatest([
    this.loading$,
    this.brand$,
  ]).pipe(
    startWith<[boolean, Brand | undefined]>([true, undefined]),
    map(([loading, brand]) => ({ loading, brand })),
  );
}
