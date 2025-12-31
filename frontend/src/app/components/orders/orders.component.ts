import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { OrderService } from '../../services/order.service';
import { OrderFormComponent } from './order-form/order-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  displayedColumns = ['orderId', 'totalAmount', 'createdAt', 'actions'];
  userId = Number(localStorage.getItem('id'));

  constructor(
    private os: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllOders();
  }

  getAllOders() {
     this.os.getOrders(this.userId).subscribe((res: any) => {
      this.orders = new MatTableDataSource(res);
      this.orders.paginator = this.paginator;
      
    });
  }

  deleteOrder(id: number) {
    if (confirm('Delete order?')) {
      this.os.deleteOrder(id).subscribe(() => {
        this.getAllOders();
      });
    }
  }

  openForm(data: any = null): void {
      const dialogRef = this.dialog.open(OrderFormComponent, {
        width: '400px',
        data: {
        mode: data ? 'E' : 'A',   // 'E' for Edit, 'A' for Add
        order: data || null
      }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) this.getAllOders();
      });
  }
}
