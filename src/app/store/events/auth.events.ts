import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { UserResponse } from '../../api/users';

export const authEvents = eventGroup({
  source: 'Auth',
  events: {
    login: type<{ email: string; passwork: string }>(),
    loginSuccess: type<UserResponse>(),
    loginFailure: type<string>(),
    logout: type<void>(),
  },
});
