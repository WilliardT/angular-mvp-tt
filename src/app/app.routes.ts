import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
  { path: '', component: SearchPage },
  { path: 'login', component: LoginPage }
];
