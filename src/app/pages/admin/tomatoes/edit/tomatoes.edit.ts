import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';
import { ButtonModule } from 'primeng/button';

import { AppBar } from '../../../../components/app-bar/app-bar.component';
import { TomatoForm } from '../../../../components/tomato-form/tomato-form.component';

import { TomatoesEditPageStore } from './tomatoes.edit.store';
import { tomatoesEvents } from '../../../../store/events';

@Component({
  imports: [AppBar, TomatoForm, ButtonModule],
  providers: [TomatoesEditPageStore],
  templateUrl: './tomatoes.edit.html',
  styleUrl: './tomatoes.edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TomatoesEditPage {
  private readonly route = inject(ActivatedRoute);
  private readonly dispatcher = inject(Dispatcher);
  readonly store = inject(TomatoesEditPageStore);

  generateLabel() {
    const id = this.route.snapshot.params['id'];
    this.dispatcher.dispatch(tomatoesEvents.generateLabel(id));
  }
}
