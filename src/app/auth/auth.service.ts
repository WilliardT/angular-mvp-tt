import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../core/config/api.config';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  cookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }

    return !!this.token;
  }

  login(payload: { username: string | null; password: string | null }) {

    if (!payload.username || !payload.password) {
      throw new Error('Username and password are required');
    }

    const formData = new FormData();

    formData.append('username', payload.username || '');
    formData.append('password', payload.password || '');

    return this.http.post<TokenResponse>(
      `${API_BASE_URL}/auth/token`,
      formData
    )
      .pipe(
        tap((val) => {
          this.token = val.accessToken;
          this.refreshToken = val.refreshToken;

          this.cookieService.set('token', val.accessToken);
          this.cookieService.set('refreshToken', val.refreshToken);
        })
      )
  }
}
