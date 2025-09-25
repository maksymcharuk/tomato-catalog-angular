import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dispatcher } from '@ngrx/signals/events';

import { FilterBarStore } from './fiter-bar.store';
import { appEvents } from '../../store/events';
import { FilterBarForm } from './types';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FilterBarStore],
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FilterBar {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dispatcher = inject(Dispatcher);
  readonly store = inject(FilterBarStore);

  readonly form = this.fb.group<FilterBarForm>({
    query: this.fb.control(''),
    categories: this.fb.control<string[]>([]),
  });

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      this.dispatcher.dispatch(appEvents.filtersChanged(value));
    });

    // Initialize the form with values from the URL query parameters
    effect(() => {
      const filters = this.store.filters();
      this.form.patchValue(filters, { emitEvent: false });
    });
  }
}
