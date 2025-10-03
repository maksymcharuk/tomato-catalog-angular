import { inject, effect } from '@angular/core';
import { getState, signalStore, withHooks, withState } from '@ngrx/signals';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { on, withEffects, withReducer } from '@ngrx/signals/events';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { mapResponse } from '@ngrx/operators';
import { switchMap, map, take, filter } from 'rxjs';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '../configs/locales';
import { Tomato } from '../api/tomatoes';
import { TomatoesApiService } from '../services/tomatoes-api.service';
import {
  appEvents,
  tomatoesApiEvents,
  tomatoesEvents,
  Filters,
} from './events';

import translationsEn from '../../../public/i18n/en.json';
import translationsUk from '../../../public/i18n/uk.json';

type AppState = {
  // Common
  locale: string;

  // Filter
  filters: Filters;

  // Tomatoes
  tomatoes: Tomato[];
  tomatoesLoading: boolean;

  // Tomato
  tomato: Tomato | null;
  tomatoLoading: boolean;
};

const initialState: AppState = {
  locale: DEFAULT_LOCALE,

  filters: {},

  tomatoes: [],
  tomatoesLoading: false,

  tomato: null,
  tomatoLoading: false,
};

export const AppStore = signalStore(
  withState(initialState),
  withReducer(
    // Common
    on(appEvents.localeChanged, ({ payload: locale }) => ({
      locale,
    })),
    // Filter
    on(
      appEvents.filtersChanged,
      appEvents.filtersInitialized,
      ({ payload: filters }) => ({
        filters,
      }),
    ),
    // Tomatoes
    on(tomatoesEvents.loadTomatoes, () => ({
      tomatoesLoading: true,
    })),
    on(tomatoesApiEvents.findSuccess, ({ payload: tomatoes }) => ({
      tomatoes,
      tomatoesLoading: false,
    })),
    on(tomatoesApiEvents.findFailure, () => ({ tomatoesLoading: false })),
    // Tomato
    on(tomatoesEvents.loadTomato, () => ({
      tomatoLoading: true,
    })),
    on(tomatoesApiEvents.findOneSuccess, ({ payload: tomato }) => ({
      tomato,
      tomatoLoading: false,
    })),
    on(tomatoesApiEvents.findOneFailure, () => ({ tomatoesLoading: false })),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      route = inject(ActivatedRoute),
      translate = inject(TranslateService),
      tomatoesApiService = inject(TomatoesApiService),
    ) => ({
      setTranslations$: events.on(appEvents.localeChanged).pipe(
        map(({ payload: locale }) => {
          translate.use(locale);
        }),
      ),
      loadTomatoes$: events.on(tomatoesEvents.loadTomatoes).pipe(
        switchMap(({ payload: filters }) => {
          return tomatoesApiService.find(filters).pipe(
            mapResponse({
              next: (response) => tomatoesApiEvents.findSuccess(response.data),
              error: (error: { message: string }) =>
                tomatoesApiEvents.findFailure(error.message),
            }),
          );
        }),
      ),
      loadTomato$: events.on(tomatoesEvents.loadTomato).pipe(
        switchMap(({ payload: slug }) => {
          return tomatoesApiService.findBySlug(slug).pipe(
            mapResponse({
              next: (response) =>
                tomatoesApiEvents.findOneSuccess(response.data[0]),
              error: (error: { message: string }) =>
                tomatoesApiEvents.findOneFailure(error.message),
            }),
          );
        }),
      ),
      initializeFilters$: route.queryParams.pipe(
        filter((params) => Object.keys(params).length !== 0),
        take(1),
        map((queryParams) => {
          const initialFilters: Filters = {};
          if (queryParams['query']) {
            initialFilters.query = queryParams['query'];
          }
          if (queryParams['categories']) {
            initialFilters.categories = queryParams['categories'].split(',');
          }
          return appEvents.filtersInitialized(initialFilters);
        }),
      ),
    }),
  ),
  withHooks({
    onInit: (store) => {
      const translate = inject(TranslateService);

      // Preload translations
      translate.setTranslation('en', translationsEn);
      translate.setTranslation('uk', translationsUk);
      translate.addLangs(AVAILABLE_LOCALES);
      translate.setFallbackLang(DEFAULT_LOCALE);

      effect(() => {
        // 👇 The effect is re-executed on state change.
        const state = getState(store);
        console.log('App state', state);
      });
    },
  }),
);
