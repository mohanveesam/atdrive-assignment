import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  register(data: any) {
    return this.api.post('auth/register', data);
  }

  login(data: any) {
    return this.api.post('auth/login', data);
  }

  // saveToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }
  saveAuthData(token: string, id: number) {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id.toString());   // 🔥 THIS WAS MISSING
}

  logout() {
    localStorage.clear();
  }
}
