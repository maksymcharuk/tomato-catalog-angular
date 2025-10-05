import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppBar } from '../../../../components/app-bar/app-bar.component';
import { TomatoForm } from '../../../../components/tomato-form/tomato-form.component';

import { TomatoesCreatePageStore } from './tomatoes.create.store';

@Component({
  imports: [AppBar, TomatoForm],
  providers: [TomatoesCreatePageStore],
  templateUrl: './tomatoes.create.html',
  styleUrl: './tomatoes.create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoesCreatePage {
  private readonly store = inject(TomatoesCreatePageStore);
}
