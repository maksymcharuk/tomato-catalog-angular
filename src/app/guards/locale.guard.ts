import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { LocaleService } from '../services/locale.service';
import { DEFAULT_LOCALE, Locale } from '../configs/locales';

@Injectable({ providedIn: 'root' })
export class LocaleGuard implements CanActivate {
  constructor(private localeService: LocaleService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.paramMap.get('lang') as Locale | null;
    const available = this.localeService.getAvailableLocales();

    if (lang && available.includes(lang)) {
      this.localeService.setLocale(lang); // Set the locale in the service
      return true;
    }

    // Auto-detect from browser language
    const browserLang = navigator.language.split('-')[0] as Locale;
    const detected = available.includes(browserLang)
      ? browserLang
      : DEFAULT_LOCALE;

    this.localeService.setLocale(detected); // Set the detected locale
    this.router.navigate([`/${detected}`]); // Redirect to the detected locale
    return false;
  }
}
