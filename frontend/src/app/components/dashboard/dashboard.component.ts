import { Component, ViewChild } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  countries = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  displayedColumns = ['flag', 'name', 'capital', 'region', 'population'];

  constructor(private cs: CommonService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.cs.getCountries().subscribe((res: any) => {
      this.countries = new MatTableDataSource(res);
      this.countries.paginator = this.paginator;
    });
  }
}
