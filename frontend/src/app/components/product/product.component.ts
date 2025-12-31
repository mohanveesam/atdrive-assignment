import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  imports: [SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private dialog : MatDialog, private ps: ProductService,){
    
  }
  displayedColumns: string[] = ['name', 'price', 'description', 'actions'];

  getAllProducts() {
    this.ps.getProducts().subscribe((res: any) => {
      this.products = new MatTableDataSource(res);
      this.products.paginator = this.paginator;
      
    });
  }
  ngOnInit() {
    this.getAllProducts();
  }

  openForm(data: any = null): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: {
      mode: data ? 'E' : 'A',
      product: data || null
    }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllProducts();
    });
  }
  
  deleteProduct(id: string): void {
  if (confirm('Are you sure you want to delete this employee?')) {
     this.ps.deleteProduct(id).subscribe(() => {
        this.getAllProducts(); 
    });
  }
  }

}
