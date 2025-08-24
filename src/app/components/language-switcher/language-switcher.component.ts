import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LocaleService } from '../../services/locale.service';
import { Locale } from '../../configs/locales';

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
  currentLocale = this.localeService.getLocale();

  constructor() {
    console.log('Language Switcher Component Locale:', this.currentLocale);
  }

  async onLocaleChange(event: Event): Promise<void> {
    const newLocale = (event.target as HTMLSelectElement).value; // Cast to HTMLSelectElement
    this.localeService.setLocale(newLocale as Locale);
    await this.router.navigate([`/${newLocale}`]); // Navigate to the new locale route
    window.location.reload(); // Reload the page to apply changes
  }
}
