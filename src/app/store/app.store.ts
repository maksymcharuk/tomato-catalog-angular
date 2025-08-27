import { inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { Events } from '@ngrx/signals/events';
import { on, withEffects, withReducer } from '@ngrx/signals/events';
import { mapResponse } from '@ngrx/operators';
import { switchMap } from 'rxjs';

import { DEFAULT_LOCALE } from '../configs/locales';
import { Brand } from '../api/brands';
import { BrandsApiService } from '../services/brands-api.service';
import { appEvents, brandsApiEvents, brandsEvents } from './events';

type AppState = {
  // Common
  locale: string;

  // Filter
  filter: { query: string; order: 'asc' | 'desc' };

  // Brands
  brands: Brand[];
  brandsLoading: boolean;

  // Brand
  brand: Brand | null;
  brandLoading: boolean;
};

const initialState: AppState = {
  locale: DEFAULT_LOCALE,

  filter: { query: '', order: 'asc' },

  brands: [],
  brandsLoading: false,

  brand: null,
  brandLoading: false,
};

export const AppStore = signalStore(
  withState(initialState),
  withReducer(
    // Common
    on(appEvents.localeChanged, ({ payload: locale }) => ({
      locale,
    })),
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
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      brandsApiService = inject(BrandsApiService),
    ) => ({
      loadBrands$: events.on(brandsEvents.loadBrands).pipe(
        switchMap(() => {
          return brandsApiService.find().pipe(
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
    }),
  ),
);
