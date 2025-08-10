import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import qs from 'qs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  private readonly http = inject(HttpClient);

  find(): Observable<{ data: any[] }> {
    const params = new HttpParams({
      fromString: qs.stringify({
        fields: ['id', 'name', 'slug'],
        sort: ['name:asc'],
        populate: ['logo', 'categories'],
      }),
    });
    return this.http.get<{ data: any[] }>(`${environment.apiUrl}/brands`, {
      params,
    });
  }

  findOne(id: string): Observable<{ data: any }> {
    const params = new HttpParams({
      fromString: qs.stringify({
        fields: ['id', 'name', 'slug'],
        populate: ['logo', 'categories'],
      }),
    });
    return this.http.get<{ data: any }>(`${environment.apiUrl}/brands/${id}`, {
      params,
    });
  }
}
