import { Component, OnInit, ViewChild } from '@angular/core';
import { inventoryDTO } from 'src/models/inventoryDTO';
import { MaterialModule } from 'src/material/material.module';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  productsDisplayed: inventoryDTO[] = [];
  totalRecords = 0;
  pageSize = 8;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiServiceService){}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getAllProducts().subscribe(data => {
      this.productsDisplayed = data;
      this.totalRecords = data.length;
      this.paginator.firstPage();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  addToCart(product: inventoryDTO): void {
    this.apiService.addToCart(product).subscribe(data => {
      alert('Product added to cart!');
    });
  }
  
}
