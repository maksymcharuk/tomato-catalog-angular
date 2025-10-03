import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { TomatoesViewStore } from './tomatoes.view.store';

@Component({
  imports: [CommonModule, TranslatePipe],
  providers: [TomatoesViewStore],
  templateUrl: './tomatoes.view.html',
  styleUrl: './tomatoes.view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoesViewPage {
  readonly store = inject(TomatoesViewStore);
}
