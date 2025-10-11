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
    createSuccess: type<Tomato>(),
    createFailure: type<string>(),
    updateSuccess: type<Tomato>(),
    updateFailure: type<string>(),
    deleteSuccess: type<string>(),
    deleteFailure: type<string>(),
    importSuccess: type<void>(),
    importFailure: type<string>(),
    generateLabelsSuccess: type<void>(),
    generateLabelsFailure: type<string>(),
    generateLabelSuccess: type<Blob>(),
    generateLabelFailure: type<string>(),
  },
});
