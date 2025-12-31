import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [SharedModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm: FormGroup;
  mode: 'A' | 'E';

  constructor(private dialogRef: MatDialogRef<ProductFormComponent>, private fb: FormBuilder,  private ps: ProductService, 
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    this.mode = data.mode;

    this.productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['']
    });
if (this.mode === 'E' && data.product) {
  const { name, price, description } = data.product;
  this.productForm.patchValue({ name, price, description });
}
  }
  onSubmit() {
    if (this.productForm.invalid) return;
if (this.mode === 'E') {
    this.ps.updateProduct(
      this.data.product._id,
      this.productForm.value
    ).subscribe(() => this.dialogRef.close(true));
  } else {
    this.ps.addProduct(this.productForm.value)
      .subscribe(() => this.dialogRef.close(true));
  }
  }
  onCancel() {
    this.dialogRef.close();
  }
}
