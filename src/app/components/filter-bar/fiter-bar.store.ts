import { inject } from '@angular/core';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { withEffects } from '@ngrx/signals/events';
import { map } from 'rxjs';

import { AppStore } from '../../store/app.store';
import { appEvents, Filters } from '../../store/events';
import { ActivatedRoute, Router } from '@angular/router';

type FilterBarState = {};

const initialState: FilterBarState = {};

export const FilterBarStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    filters: appStore.filters,
  })),
  withEffects(
    (
      store,
      events = inject(Events),
      dispatcher = inject(Dispatcher),
      router = inject(Router),
      route = inject(ActivatedRoute),
    ) => ({
      updateQueryParams$: events.on(appEvents.filtersChanged).pipe(
        map(({ payload: filters }) => {
          const queryParams: Partial<Record<keyof Filters, string>> = {};

          if (filters.query) {
            queryParams['query'] = filters.query;
          }

          if (filters.categories && filters.categories.length > 0) {
            queryParams['categories'] = filters.categories.join(',');
          }

          router.navigate([], {
            relativeTo: route,
            queryParams,
          });
        }),
      ),
    }),
  ),
);
