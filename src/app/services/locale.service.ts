import { Injectable } from '@angular/core';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE, Locale } from '../configs/locales';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocale: Locale = DEFAULT_LOCALE;

  constructor() {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && this.isValidLocale(saved)) {
      this.currentLocale = saved;
    }
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  setLocale(locale: Locale) {
    if (!this.isValidLocale(locale)) return;
    this.currentLocale = locale;
    localStorage.setItem('locale', locale);
  }

  getAvailableLocales(): Locale[] {
    return [...AVAILABLE_LOCALES];
  }

  private isValidLocale(locale: string): locale is Locale {
    return AVAILABLE_LOCALES.includes(locale as Locale);
  }
}
