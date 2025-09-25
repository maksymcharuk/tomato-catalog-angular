import { type } from '@ngrx/signals';
349;
import { eventGroup } from '@ngrx/signals/events';

import { Category } from '../../api/categories';

export const categoriesApiEvents = eventGroup({
  source: 'Categories API',
  events: {
    findSuccess: type<Category[]>(),
    findFailure: type<string>(),
  },
});
