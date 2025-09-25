import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Dispatcher } from '@ngrx/signals/events';

import { LocaleService } from '../services/locale.service';
import { DEFAULT_LOCALE, Locale } from '../configs/locales';
import { appEvents } from '../store/events';

@Injectable({ providedIn: 'root' })
export class LocaleGuard implements CanActivate {
  private readonly localeService = inject(LocaleService);
  private readonly router = inject(Router);
  private readonly dispatcher = inject(Dispatcher);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.paramMap.get('lang') as Locale | null;
    const available = this.localeService.getAvailableLocales();

    if (lang && available.includes(lang)) {
      this.localeService.setLocale(lang); // Set the locale in the service
      this.dispatcher.dispatch(appEvents.localeChanged(lang)); // Notify the app about the locale change
      return true;
    }

    // Auto-detect from browser language
    const browserLang = navigator.language.split('-')[0] as Locale;
    const detected = available.includes(browserLang)
      ? browserLang
      : DEFAULT_LOCALE;

    this.localeService.setLocale(detected); // Set the detected locale
    this.dispatcher.dispatch(appEvents.localeChanged(detected)); // Notify the app about the locale change
    this.router.navigate([`/${detected}`]); // Redirect to the detected locale
    return false;
  }
}
