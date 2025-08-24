import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocaleService } from '../services/locale.service';

export function localeInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const localeService = inject(LocaleService);
  const lang = localeService.getLocale();
  const modified = request.clone({
    params: request.params.append('locale', lang),
  });

  return next(modified);
}
