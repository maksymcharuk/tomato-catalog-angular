import { inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { Title } from '@angular/platform-browser';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { withEffects } from '@ngrx/signals/events';
import { map } from 'rxjs';

import { AppStore } from '../../../store/app.store';
import { appEvents, tomatoesEvents } from '../../../store/events';

type TomatoesViewState = {};

const initialState: TomatoesViewState = {};

export const TomatoesViewStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    tomato: appStore.tomato,
    tomatoLoading: appStore.tomatoLoading,
  })),
  withEffects(
    (
      store,
      events = inject(Events),
      dispatcher = inject(Dispatcher),
      route = inject(ActivatedRoute),
    ) => ({
      loadTomato$: events.on(appEvents.localeChanged).pipe(
        map(() => {
          const slug = route.snapshot.params['slug'];
          dispatcher.dispatch(tomatoesEvents.loadTomato(slug));
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

      dispatcher.dispatch(tomatoesEvents.loadTomato(slug));

      effect(() => {
        const tomato = store.tomato();
        if (tomato) {
          title.setTitle(`${tomato.name}`);
        } else {
          title.setTitle('Tomato Not Found - Tomatoes Catalog');
        }
      });
    },
  }),
);
