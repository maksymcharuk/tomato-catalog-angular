import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signalStore, withHooks, withProps, withState } from '@ngrx/signals';
import { Dispatcher } from '@ngrx/signals/events';

import { appEvents, tomatoesEvents } from '../../../../store/events';
import { AppStore } from '../../../../store/app.store';

type TomatoesEditPageState = {};

const initialState: TomatoesEditPageState = {};

export const TomatoesEditPageStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    tomato: appStore.tomato,
  })),
  withHooks({
    onInit: (store) => {
      const route = inject(ActivatedRoute);
      const dispatcher = inject(Dispatcher);

      const id = route.snapshot.params['id'];
      dispatcher.dispatch(tomatoesEvents.loadTomato(id));
    },
  }),
);
