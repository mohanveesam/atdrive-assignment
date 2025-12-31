import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-form',
  imports: [SharedModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  mode: 'A' | 'E';
  userId = Number(localStorage.getItem('id'));
  order: any;
  products: any[] = [];
  assignedProducts: any = [];
  constructor(
    private dialogRef: MatDialogRef<OrderFormComponent>,
    private fb: FormBuilder,
    private os: OrderService,
    private ps: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.mode = data.mode;
    this.order = data.order;
    
    this.orderForm = this.fb.group({
      productIds: [[], Validators.required],
    });
  }
ngOnInit(): void {
  this.ps.getProducts().subscribe((res: any = []) => {
    this.products = res;

    if (this.mode === 'E' && this.order?.productIds?.length) {

      // Convert ALL order productIds to STRING
      const orderProductIds = this.order.productIds.map((id: any) =>
        id.toString()
      );

      // Assigned products for UL display
      this.assignedProducts = this.products.filter(p =>
        orderProductIds.includes(p._id.toString())
      );

      // Patch mat-select correctly
      this.orderForm.patchValue({
        productIds: orderProductIds
      });
    }
  });
}


onSubmit() {
  const selected = this.products.filter((product: any) =>
    this.orderForm.value.productIds.includes(product._id.toString())
  );

  const totalAmount = selected.reduce(
    (sum: number, product: any) => sum + Number(product.price),
    0
  );

  const payload = {
    userId: this.userId,
    productIds: this.orderForm.value.productIds,
    totalAmount,
  };

  if (this.mode === 'E') {
    this.os
      .updateOrder(this.order.orderId, payload)
      .subscribe(() => this.dialogRef.close(true));
  } else {
    this.os.createOrder(payload)
      .subscribe(() => this.dialogRef.close(true));
  }
}

  onCancel() {
    this.dialogRef.close();
  }
}
