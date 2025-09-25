import { inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { Title } from '@angular/platform-browser';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { withEffects } from '@ngrx/signals/events';
import { map } from 'rxjs';

import { AppStore } from '../../../store/app.store';
import { appEvents, brandsEvents } from '../../../store/events';

type BrandsViewState = {};

const initialState: BrandsViewState = {};

export const BrandsViewStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    brand: appStore.brand,
    brandLoading: appStore.brandLoading,
  })),
  withEffects(
    (
      store,
      events = inject(Events),
      dispatcher = inject(Dispatcher),
      route = inject(ActivatedRoute),
    ) => ({
      loadBrand$: events.on(appEvents.localeChanged).pipe(
        map(() => {
          const slug = route.snapshot.params['slug'];
          dispatcher.dispatch(brandsEvents.loadBrand(slug));
        }),
      ),
    }),
  ),
  withHooks({
    onInit: (store) => {
      const route = inject(ActivatedRoute);
      const dispatcher = inject(Dispatcher);
      const title = inject(Title);

      const slug = route.snapshot.params['slug'];

      dispatcher.dispatch(brandsEvents.loadBrand(slug));

      effect(() => {
        const brand = store.brand();
        if (brand) {
          title.setTitle(`${brand.name} - BC`);
        } else {
          title.setTitle('Brand Not Found - Brands Catalog');
        }
      });
    },
  }),
);
