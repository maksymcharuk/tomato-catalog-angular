import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { Filters } from './app.events';

export const tomatoesEvents = eventGroup({
  source: 'Tomatoes',
  events: {
    loadTomatoes: type<Filters | undefined>(),
    loadTomato: type<string>(),
  },
});
