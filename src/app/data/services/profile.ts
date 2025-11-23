import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IProfile} from '../interfaces/profile.interface';
import {API_BASE_URL} from '../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})

export class ProfileService {
  http = inject(HttpClient);

  getTestAccount() {
    return this.http.get<IProfile[]>(`${API_BASE_URL}/account/test_accounts`);
  }
}
