import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppBar } from '../../../../components/app-bar/app-bar.component';
import { TomatoForm } from '../../../../components/tomato-form/tomato-form.component';

import { TomatoesEditPageStore } from './tomatoes.edit.store';

@Component({
  imports: [AppBar, TomatoForm],
  providers: [TomatoesEditPageStore],
  templateUrl: './tomatoes.edit.html',
  styleUrl: './tomatoes.edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoesEditPage {
  readonly store = inject(TomatoesEditPageStore);
}
