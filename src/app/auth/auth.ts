import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(payload: { username: string | null; password: string | null }) {

    if (!payload.username || !payload.password) {
      throw new Error('Username and password are required');
    }

    const formData = new FormData();

    formData.append('username', payload.username || '');
    formData.append('password', payload.password || '');

    return this.http.post<{ token: string }>(
      `${API_BASE_URL}/auth/token`,
      formData
    );
  }
}
