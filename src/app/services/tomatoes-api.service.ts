import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import qs from 'qs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../api/shared';
import { Tomato } from '../api/tomatoes';
import { Filters } from '../store/events';
import { CreateTomatoDto, UpdateTomatoDto } from '../api/dtos/tomatoes';

@Injectable({
  providedIn: 'root',
})
export class TomatoesApiService {
  private readonly http = inject(HttpClient);

  find(filters?: Filters): Observable<ApiResponse<Tomato[]>> {
    const params = new HttpParams({
      fromString: qs.stringify({
        fields: ['id', 'name', 'description', 'price'],
        populate: ['primaryImage', 'images'],
        sort: ['name:asc'],
        filters: buildFiltersQuery(filters),
      }),
    });
    return this.http.get<ApiResponse<Tomato[]>>(
      `${environment.apiUrl}/tomatoes`,
      {
        params,
      },
    );
  }

  findOne(id: string): Observable<ApiResponse<Tomato>> {
    const params = new HttpParams({
      fromString: qs.stringify({
        fields: ['id', 'name', 'description', 'price'],
        populate: ['primaryImage', 'images'],
      }),
    });
    return this.http.get<ApiResponse<Tomato>>(
      `${environment.apiUrl}/tomatoes/${id}`,
      {
        params,
      },
    );
  }

  create(data: CreateTomatoDto): Observable<ApiResponse<Tomato>> {
    return this.http.post<ApiResponse<Tomato>>(
      `${environment.apiUrl}/tomatoes`,
      { data },
    );
  }

  update(
    id: string,
    data: Partial<CreateTomatoDto>,
  ): Observable<ApiResponse<Tomato>> {
    return this.http.put<ApiResponse<Tomato>>(
      `${environment.apiUrl}/tomatoes/${id}`,
      { data },
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tomatoes/${id}`);
  }

  import(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/tomatoes/import`, {});
  }

  labels(ids?: string[]): Observable<Blob> {
    const params = new HttpParams();

    if (ids && ids.length === 0) {
      params.set('ids', ids.join(','));
    }

    return this.http.get(`${environment.apiUrl}/tomatoes/labels`, {
      responseType: 'blob',
      params,
    });
  }

  label(id: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/tomatoes/labels/${id}`, {
      responseType: 'blob',
    });
  }
}

function buildFiltersQuery(filters?: Filters): any {
  if (!filters) {
    return undefined;
  }

  const query: any = {};
  if (filters.query) {
    query.name = { $containsi: filters.query };
  }
  if (filters.categories && filters.categories.length > 0) {
    query.categories = { slug: { $in: filters.categories } };
  }
  return query;
}
