import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { LocaleRouterService } from '../services/locale-router.service';

@Injectable({ providedIn: 'root' })
export class SignedInGuard implements CanActivate {
  private readonly localeRouter = inject(LocaleRouterService);

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check if the JWT token exists

    if (token) {
      // User is signed in
      return true;
    }

    // User is not signed in, redirect to the sign-in page
    this.localeRouter.navigate(['sign-in']);
    return false;
  }
}
