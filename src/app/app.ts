import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './configs/locales';
import { LocaleService } from './services/locale.service';

import { AppBarComponent } from './components/app-bar/app-bar.component';

import translationsEn from '../../public/i18n/en.json';
import translationsUk from '../../public/i18n/uk.json';

@Component({
  selector: 'app',
  imports: [RouterOutlet, AppBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class App implements OnInit {
  private readonly localeService = inject(LocaleService);
  private readonly translate = inject(TranslateService);

  constructor() {
    // Preload translations
    this.translate.setTranslation('en', translationsEn);
    this.translate.setTranslation('uk', translationsUk);
    this.translate.addLangs(AVAILABLE_LOCALES);
    this.translate.setFallbackLang(DEFAULT_LOCALE);
  }

  ngOnInit(): void {
    // Subscribe to locale changes
    this.localeService.currentLocale$.subscribe((locale) => {
      console.log('App Component Locale:', locale);
      this.translate.use(locale);
    });
  }
}
