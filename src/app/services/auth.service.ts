import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/local`, {
      identifier,
      password,
    });
  }
}
