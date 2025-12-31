import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductComponent},
      { path: 'orders', component: OrdersComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
