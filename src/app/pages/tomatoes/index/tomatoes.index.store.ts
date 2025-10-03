import { inject, effect } from '@angular/core';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { Title } from '@angular/platform-browser';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { withEffects } from '@ngrx/signals/events';
import { map } from 'rxjs';

import { AppStore } from '../../../store/app.store';
import { appEvents, tomatoesEvents } from '../../../store/events';

type TomatoesIndexState = {};

const initialState: TomatoesIndexState = {};

export const TomatoesIndexStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    filters: appStore.filters,
    tomatoes: appStore.tomatoes,
    tomatoesLoading: appStore.tomatoesLoading,
  })),
  withEffects(
    (store, events = inject(Events), dispatcher = inject(Dispatcher)) => ({
      loadTomatoesOnLocaleChanged$: events.on(appEvents.localeChanged).pipe(
        map(() => {
          dispatcher.dispatch(tomatoesEvents.loadTomatoes(store.filters()));
        }),
      ),
      loadTomatoesOnFilterChange$: events.on(appEvents.filtersChanged).pipe(
        map(({ payload: filters }) => {
          dispatcher.dispatch(tomatoesEvents.loadTomatoes(filters));
        }),
      ),
    }),
  ),
  withHooks({
    onInit: (store) => {
      const appStore = inject(AppStore);
      const dispatcher = inject(Dispatcher);
      const title = inject(Title);

      dispatcher.dispatch(tomatoesEvents.loadTomatoes(store.filters()));

      effect(() => {
        const locale = appStore.locale();
        title.setTitle(
          `${locale === 'uk' ? 'Список Томатів' : 'Tomatoes List'} - BC`,
        );
      });
    },
  }),
);
