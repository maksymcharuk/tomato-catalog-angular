import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { Filters } from './app.events';

export const brandsEvents = eventGroup({
  source: 'Brands',
  events: {
    loadBrands: type<Filters | undefined>(),
    loadBrand: type<string>(),
  },
});
