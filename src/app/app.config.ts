import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { localeInterceptor } from './interceptors/locale.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([localeInterceptor])),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
