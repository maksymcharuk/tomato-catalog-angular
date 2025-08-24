import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LanguageSwitcherComponent {
  private readonly localeService = inject(LocaleService);
  private readonly router = inject(Router);

  availableLocales = this.localeService.getAvailableLocales();
  currentLocale$ = this.localeService.currentLocale$;

  async onLocaleChange(event: Event): Promise<void> {
    const newLocale = (event.target as HTMLSelectElement).value; // Cast to HTMLSelectElement

    // Get the current route and query parameters
    const currentUrlTree = this.router.parseUrl(this.router.url);
    const segments = currentUrlTree.root.children['primary']?.segments || [];

    // Replace the first segment (language) with the new locale
    if (segments.length > 0) {
      segments[0].path = newLocale;
    }

    // Create a new URL tree with the updated language
    const newUrlTree = this.router.createUrlTree(
      segments.map((segment) => segment.path),
      {
        queryParams: currentUrlTree.queryParams,
      },
    );

    // Navigate to the new URL
    await this.router.navigateByUrl(newUrlTree, { replaceUrl: true });
  }
}
