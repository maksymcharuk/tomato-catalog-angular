import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export interface Filters {
  query?: string;
  categories?: string[];
}

export const appEvents = eventGroup({
  source: 'App',
  events: {
    localeChanged: type<string>(),
    filtersInitialized: type<Filters>(),
    filtersChanged: type<Filters>(),
  },
});
