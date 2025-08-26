import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import qs from 'qs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../api/shared';
import { Category } from '../api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private readonly http = inject(HttpClient);

  find(): Observable<ApiResponse<Category[]>> {
    const params = qs.stringify({
      fields: ['id', 'name', 'slug'],
      sort: ['name:asc'],
    });
    return this.http.get<ApiResponse<Category[]>>(
      `${environment.apiUrl}/categories?${params}`,
    );
  }
}
