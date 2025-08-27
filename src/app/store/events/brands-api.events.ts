import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import { Brand } from '../../api/brands';

export const brandsApiEvents = eventGroup({
  source: 'Brands API',
  events: {
    findSuccess: type<Brand[]>(),
    findFailure: type<string>(),
    findOneSuccess: type<Brand>(),
    findOneFailure: type<string>(),
  },
});
