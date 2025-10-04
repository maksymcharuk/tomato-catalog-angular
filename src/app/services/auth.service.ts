import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../api/users';

const TOKEN_KEY = 'token';
const USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string | null): void {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) {
      return null;
    }
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }

  setCurrentUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(USER_KEY);
      return;
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/local`, {
        identifier,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.setToken(response?.jwt || null);
          this.setCurrentUser(response?.user || null);
        }),
      );
  }

  logout(): void {
    this.setToken(null);
    this.setCurrentUser(null);
  }
}
