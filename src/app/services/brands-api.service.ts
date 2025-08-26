import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import qs from 'qs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../api/shared';
import { Brand } from '../api/brands';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  private readonly http = inject(HttpClient);

  find(): Observable<ApiResponse<Brand[]>> {
    const params = new HttpParams({
      fromString: qs.stringify({
        fields: ['id', 'name', 'slug'],
        populate: ['logo', 'categories'],
        sort: ['name:asc'],
      }),
    });
    return this.http.get<ApiResponse<Brand[]>>(`${environment.apiUrl}/brands`, {
      params,
    });
  }

  findOne(id: string): Observable<ApiResponse<Brand>> {
    const params = new HttpParams({
      fromString: qs.stringify({
        fields: ['id', 'name', 'slug'],
        populate: ['logo', 'categories'],
      }),
    });
    return this.http.get<ApiResponse<Brand>>(
      `${environment.apiUrl}/brands/${id}`,
      {
        params,
      },
    );
  }

  findBySlug(slug: string): Observable<ApiResponse<Brand[]>> {
    const params = new HttpParams({
      fromString: qs.stringify({
        filters: { slug },
        fields: ['id', 'name', 'slug'],
        populate: ['logo', 'categories'],
      }),
    });
    return this.http.get<ApiResponse<Brand[]>>(`${environment.apiUrl}/brands`, {
      params,
    });
  }
}
