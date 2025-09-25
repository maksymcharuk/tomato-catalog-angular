import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const categoriesEvents = eventGroup({
  source: 'Categories',
  events: {
    loadCategories: type<void>(),
  },
});
