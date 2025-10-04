import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { LocaleRouterService } from '../services/locale-router.service';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class SignedOutGuard implements CanActivate {
  private readonly localeRouter = inject(LocaleRouterService);
  private readonly authService = inject(AuthService);

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // User is signed out
      return true;
    }

    // User is not signed in, redirect to the sign-in page
    this.localeRouter.navigate(['admin', 'dashboard']);
    return false;
  }
}
