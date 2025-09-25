import { inject, effect } from '@angular/core';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { Title } from '@angular/platform-browser';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { withEffects } from '@ngrx/signals/events';
import { map } from 'rxjs';

import { AppStore } from '../../../store/app.store';
import { appEvents, brandsEvents } from '../../../store/events';

type BrandsIndexState = {};

const initialState: BrandsIndexState = {};

export const BrandsIndexStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    filters: appStore.filters,
    brands: appStore.brands,
    brandsLoading: appStore.brandsLoading,
  })),
  withEffects(
    (store, events = inject(Events), dispatcher = inject(Dispatcher)) => ({
      loadBrandsOnLocaleChanged$: events.on(appEvents.localeChanged).pipe(
        map(() => {
          dispatcher.dispatch(brandsEvents.loadBrands(store.filters()));
        }),
      ),
      loadBrandsOnFilterChange$: events.on(appEvents.filtersChanged).pipe(
        map(({ payload: filters }) => {
          dispatcher.dispatch(brandsEvents.loadBrands(filters));
        }),
      ),
    }),
  ),
  withHooks({
    onInit: (store) => {
      const appStore = inject(AppStore);
      const dispatcher = inject(Dispatcher);
      const title = inject(Title);

      dispatcher.dispatch(brandsEvents.loadBrands(store.filters()));

      effect(() => {
        const locale = appStore.locale();
        title.setTitle(
          `${locale === 'uk' ? 'Список Брендів' : 'Brands List'} - BC`,
        );
      });
    },
  }),
);
