import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { Tomato } from '../../api/tomatoes';

export const tomatoesApiEvents = eventGroup({
  source: 'Tomatoes API',
  events: {
    findSuccess: type<Tomato[]>(),
    findFailure: type<string>(),
    findOneSuccess: type<Tomato>(),
    findOneFailure: type<string>(),
  },
});
