import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AVAILABLE_LOCALES, DEFAULT_LOCALE, Locale } from '../configs/locales';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLocaleSubject = new BehaviorSubject<Locale>(DEFAULT_LOCALE);
  currentLocale$ = this.currentLocaleSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('locale') as Locale | null;
    const initialLocale = saved || DEFAULT_LOCALE;
    this.setLocale(initialLocale);
  }

  getLocale(): Locale {
    return this.currentLocaleSubject.value;
  }

  setLocale(locale: Locale): void {
    if (AVAILABLE_LOCALES.includes(locale)) {
      this.currentLocaleSubject.next(locale);
      localStorage.setItem('locale', locale);
    }
  }

  getAvailableLocales(): Locale[] {
    return [...AVAILABLE_LOCALES];
  }
}
