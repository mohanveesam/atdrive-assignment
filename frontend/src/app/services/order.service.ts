import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private api: ApiService) {}

  getOrders(userId: number) {
    return this.api.get(`orders/user/${userId}`);
  }

  createOrder(data: any) {
    return this.api.post('orders', data);
  }

  updateOrder(id: number, data: any) {
    return this.api.put(`orders/${id}`, data);
  }

  deleteOrder(id: number) {
    return this.api.delete(`orders/${id}`);
  }
}
