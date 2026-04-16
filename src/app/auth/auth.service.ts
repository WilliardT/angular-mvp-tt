import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOCK_API_BASE_URL } from '../core/config/api.config';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.token;
  }

  login(payload: { username: string | null; password: string | null }) {

    if (!payload.username || !payload.password) {
      throw new Error('Username and password are required');
    }

    // const formData = new FormData();
    //
    // formData.append('username', payload.username || '');
    // formData.append('password', payload.password || '');

    // return this.http.post<TokenResponse>(
    //   `${API_BASE_URL}/auth/token`,
    //   formData
    // )

    return this.http.post<TokenResponse>(
      `${MOCK_API_BASE_URL}/auth/login`,
      {
        username: payload.username,
        password: payload.password,
        expiresInMins: 30,
      },
      { withCredentials: true }
    )
      .pipe(
        tap((val: TokenResponse) => this.saveTokens(val)),
      )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${MOCK_API_BASE_URL}/auth/refresh`,
      {
        refreshToken: this.refreshToken,
        expiresInMins: 30,
      },
      { withCredentials: true }
    )
      .pipe(
        tap((val) => this.saveTokens(val)),

        catchError((err) => {
          this.logout()

          return throwError(err)
        })
      )
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;

    this.router.navigate(['/login'])
  }

  saveTokens(response: TokenResponse) {
    this.token = response.accessToken;
    this.refreshToken = response.refreshToken;

    this.cookieService.set('token', response.accessToken);
    this.cookieService.set('refreshToken', response.refreshToken);
  }


}
