import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { User } from '../../api/users';

export interface Filters {
  query?: string;
  categories?: string[];
}

export const appEvents = eventGroup({
  source: 'App',
  events: {
    localeChanged: type<string>(),
    userSignedIn: type<User>(),
    userSignedOut: type<void>(),
    filtersInitialized: type<Filters>(),
    filtersChanged: type<Filters>(),
  },
});
