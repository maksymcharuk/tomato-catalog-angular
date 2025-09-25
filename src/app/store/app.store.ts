import { inject, effect } from '@angular/core';
import { getState, signalStore, withHooks, withState } from '@ngrx/signals';
import { Dispatcher, Events } from '@ngrx/signals/events';
import { on, withEffects, withReducer } from '@ngrx/signals/events';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { mapResponse } from '@ngrx/operators';
import { switchMap, map, take, filter } from 'rxjs';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '../configs/locales';
import { Brand } from '../api/brands';
import { Category } from '../api/categories';
import { BrandsApiService } from '../services/brands-api.service';
import { CategoriesApiService } from '../services/categories-api.service';
import {
  appEvents,
  brandsApiEvents,
  brandsEvents,
  categoriesApiEvents,
  categoriesEvents,
  Filters,
} from './events';

import translationsEn from '../../../public/i18n/en.json';
import translationsUk from '../../../public/i18n/uk.json';

type AppState = {
  // Common
  locale: string;

  // Filter
  filters: Filters;

  // Brands
  brands: Brand[];
  brandsLoading: boolean;

  // Brand
  brand: Brand | null;
  brandLoading: boolean;

  // Categories
  categories: Category[];
  categoriesLoading: boolean;
};

const initialState: AppState = {
  locale: DEFAULT_LOCALE,

  filters: {},

  brands: [],
  brandsLoading: false,

  brand: null,
  brandLoading: false,

  categories: [],
  categoriesLoading: false,
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
    // Brands
    on(brandsEvents.loadBrands, () => ({
      brandsLoading: true,
    })),
    on(brandsApiEvents.findSuccess, ({ payload: brands }) => ({
      brands,
      brandsLoading: false,
    })),
    on(brandsApiEvents.findFailure, () => ({ brandsLoading: false })),
    // Brand
    on(brandsEvents.loadBrand, () => ({
      brandLoading: true,
    })),
    on(brandsApiEvents.findOneSuccess, ({ payload: brand }) => ({
      brand,
      brandLoading: false,
    })),
    on(brandsApiEvents.findOneFailure, () => ({ brandsLoading: false })),
    // Categories
    on(categoriesEvents.loadCategories, () => ({
      categoriesLoading: true,
    })),
    on(categoriesApiEvents.findSuccess, ({ payload: categories }) => ({
      categories,
      categoriesLoading: false,
    })),
    on(categoriesApiEvents.findFailure, () => ({ categoriesLoading: false })),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      route = inject(ActivatedRoute),
      translate = inject(TranslateService),
      brandsApiService = inject(BrandsApiService),
      categoriesApiService = inject(CategoriesApiService),
    ) => ({
      setTranslations$: events.on(appEvents.localeChanged).pipe(
        map(({ payload: locale }) => {
          translate.use(locale);
        }),
      ),
      loadBrands$: events.on(brandsEvents.loadBrands).pipe(
        switchMap(({ payload: filters }) => {
          return brandsApiService.find(filters).pipe(
            mapResponse({
              next: (response) => brandsApiEvents.findSuccess(response.data),
              error: (error: { message: string }) =>
                brandsApiEvents.findFailure(error.message),
            }),
          );
        }),
      ),
      loadBrand$: events.on(brandsEvents.loadBrand).pipe(
        switchMap(({ payload: slug }) => {
          return brandsApiService.findBySlug(slug).pipe(
            mapResponse({
              next: (response) =>
                brandsApiEvents.findOneSuccess(response.data[0]),
              error: (error: { message: string }) =>
                brandsApiEvents.findOneFailure(error.message),
            }),
          );
        }),
      ),
      loadCategories$: events.on(categoriesEvents.loadCategories).pipe(
        switchMap(() => {
          return categoriesApiService.find().pipe(
            mapResponse({
              next: (response) =>
                categoriesApiEvents.findSuccess(response.data),
              error: (error: { message: string }) =>
                categoriesApiEvents.findFailure(error.message),
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
