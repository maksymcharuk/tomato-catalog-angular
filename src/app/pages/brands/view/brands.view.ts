import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { BrandsViewStore } from './brands.view.store';

@Component({
  imports: [CommonModule, TranslatePipe],
  providers: [BrandsViewStore],
  templateUrl: './brands.view.html',
  styleUrl: './brands.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandsViewPage {
  readonly store = inject(BrandsViewStore);
}
