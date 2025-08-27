import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const brandsEvents = eventGroup({
  source: 'Brands',
  events: {
    loadBrands: type<void>(),
    loadBrand: type<string>(),
  },
});
