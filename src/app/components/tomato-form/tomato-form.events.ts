import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { Tomato } from '../../api/tomatoes';
import { CreateTomatoDto, UpdateTomatoDto } from './types';

export const tomatoFormEvents = eventGroup({
  source: 'Tomato Form',
  events: {
    createTomato: type<CreateTomatoDto>(),
    createTomatoSuccess: type<Tomato>(),
    createTomatoFailure: type<string>(),
    updateTomato: type<UpdateTomatoDto>(),
    updateTomatoSuccess: type<Tomato>(),
    updateTomatoFailure: type<string>(),
  },
});
