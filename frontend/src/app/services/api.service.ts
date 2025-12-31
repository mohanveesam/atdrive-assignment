import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${this.BASE_URL}/${url}`);
  }

  post(url: string, data: any) {
    return this.http.post(`${this.BASE_URL}/${url}`, data);
  }

  put(url: string, data: any) {
    return this.http.put(`${this.BASE_URL}/${url}`, data);
  }

  delete(url: string) {
    return this.http.delete(`${this.BASE_URL}/${url}`);
  }
}
