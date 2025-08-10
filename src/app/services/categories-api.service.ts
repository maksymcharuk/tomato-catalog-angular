import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import qs from 'qs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private readonly http = inject(HttpClient);

  find(): Observable<{ data: any[] }> {
    const params = qs.stringify({
      fields: ['id', 'name', 'slug'],
      sort: ['name:asc'],
    });
    return this.http.get<{ data: any[] }>(
      `${environment.apiUrl}/brands?${params}`
    );
  }
}
