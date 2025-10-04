import { inject } from '@angular/core';
import { signalStore, withProps, withState } from '@ngrx/signals';
import { Events } from '@ngrx/signals/events';
import { withEffects } from '@ngrx/signals/events';
import { mapResponse } from '@ngrx/operators';
import { map, switchMap } from 'rxjs';

import { appEvents, authEvents } from '../../../store/events';
import { AppStore } from '../../../store/app.store';
import { UserResponse } from '../../../api/users';

import { AuthService } from '../../../services/auth.service';
import { LocaleRouterService } from '../../../services/locale-router.service';

type SignInPageState = {};

const initialState: SignInPageState = {};

export const SignInPageStore = signalStore(
  withState(initialState),
  withProps((store, appStore = inject(AppStore)) => ({
    currentUser: appStore.currentUser,
  })),
  withEffects(
    (
      store,
      events = inject(Events),
      authService = inject(AuthService),
      localeRouter = inject(LocaleRouterService),
    ) => ({
      login$: events.on(authEvents.login).pipe(
        switchMap(({ payload: { email, passwork } }) =>
          authService.login(email, passwork).pipe(
            mapResponse({
              next: (response: UserResponse) => {
                return authEvents.loginSuccess(response);
              },
              error: (error: any) => {
                return authEvents.loginFailure(error.message || 'Login failed');
              },
            }),
          ),
        ),
      ),
      loginSuccessful$: events.on(authEvents.loginSuccess).pipe(
        map(({ payload: response }) => {
          localeRouter.navigate(['/admin/dashboard']);
          return appEvents.userSignedIn(response.user);
        }),
      ),
    }),
  ),
);
