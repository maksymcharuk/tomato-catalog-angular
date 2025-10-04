import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppBar } from '../../../components/app-bar/app-bar.component';
import { TomatoesIndexStore } from './tomatoes.index.store';

@Component({
  imports: [AppBar, CardModule, ProgressSpinnerModule],
  providers: [TomatoesIndexStore],
  templateUrl: './tomatoes.index.html',
  styleUrl: './tomatoes.index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoesIndexPage {
  readonly store = inject(TomatoesIndexStore);
}
