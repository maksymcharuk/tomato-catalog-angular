import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { Filters } from './app.events';
import { CreateTomatoDto, UpdateTomatoDto } from '../../api/dtos/tomatoes';

export const tomatoesEvents = eventGroup({
  source: 'Tomatoes',
  events: {
    loadTomatoes: type<Filters | undefined>(),
    loadTomato: type<string>(),
    createTomato: type<CreateTomatoDto>(),
    updateTomato: type<UpdateTomatoDto>(),
    deleteTomato: type<string>(),
  },
});
