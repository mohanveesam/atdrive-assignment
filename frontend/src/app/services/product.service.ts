import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts() {
    return this.api.get('products');
  }

  addProduct(data: any) {
    return this.api.post('products', data);
  }

  updateProduct(id: string, data: any) {
    return this.api.put(`products/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.api.delete(`products/${id}`);
  }
}
