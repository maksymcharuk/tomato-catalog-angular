import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { LocaleService } from '../services/locale.service'; // Assuming you have a LocaleService to manage the current locale

@Injectable({ providedIn: 'root' })
export class LocaleRouterService {
  private readonly router: Router = inject(Router);
  private readonly localeService: LocaleService = inject(LocaleService);

  navigate(commands: any[], extras?: any): Promise<boolean> {
    const locale = this.localeService.getLocale(); // Get the current locale
    const prefixedCommands = [`/${locale}`, ...commands]; // Add the locale prefix
    return this.router.navigate(prefixedCommands, extras);
  }

  navigateByUrl(url: string | UrlTree, extras?: any): Promise<boolean> {
    const locale = this.localeService.getLocale(); // Get the current locale
    const prefixedUrl = `/${locale}${typeof url === 'string' ? url : this.router.serializeUrl(url)}`; // Add the locale prefix
    return this.router.navigateByUrl(prefixedUrl, extras);
  }
}
