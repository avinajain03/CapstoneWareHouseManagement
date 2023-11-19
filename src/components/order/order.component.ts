import { Component, OnInit, ViewChild } from '@angular/core';
import { vendorOrder } from 'src/models/vendorOrder';
import { MaterialModule } from 'src/material/material.module';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  vendorOrders!: MatTableDataSource<vendorOrder>;
  displayedColumns: string[] = ['vendorOrderId', 'productId', 'productName', 'category', 'supplierName', 'price', 'productQuantity', 'increaseQuantity', 'decreaseQuantity', 'actions'];
  totalRecords = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 20, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.loadVendorOrders();
  }

  loadVendorOrders(): void {
    this.apiService.getAllOrders().subscribe(data => {
      console.log(data);
      data.forEach(order => {
        order.subTotal = order.price;
      });
      this.vendorOrders = new MatTableDataSource<vendorOrder>(data);
      this.totalRecords = data.length;
      this.vendorOrders.paginator = this.paginator;
    });
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  updateOrderPrice(order: vendorOrder): number {
    order.subTotal = order.productQuantity * order.price;
    return order.subTotal;
  }



  deleteOrder(order: vendorOrder): void {
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    console.log(order);
    console.log(order.vendorOrderId);
    if (confirmDelete) {
      this.apiService.deleteOrder(order.vendorOrderId).subscribe(response => {
        this.apiService.updateInventory(order.productId, order.productQuantity).subscribe(() => {
          alert(response);
        this.loadVendorOrders();

        })
        
      }, error => {
        alert(error);
      });
    }
  }

  increaseQuantity(order: vendorOrder) {
    order.productQuantity++;
    this.updateOrderPrice(order);
    this.apiService.updateVendorOrder(order).subscribe(() => {
      this.apiService.updateInventory(order.productId, -1).subscribe(() => {
        this.loadVendorOrders();
      });
    });
  }
  
  decreaseQuantity(order: vendorOrder) {
    order.productQuantity--;
    this.updateOrderPrice(order);
    this.apiService.updateVendorOrder(order).subscribe({
      next: (res) => {
        console.log("After upation");
        console.log(res);
        this.apiService.updateInventory(order.productId, 1).subscribe({
          next: (resp) => {
            console.log(resp);
            this.loadVendorOrders();
          }
        });
      }
    });
  }

  getTotalSubtotal(): number {
    let totalSubtotal = 0;
    this.vendorOrders.data.forEach(order => {
      totalSubtotal += order.subTotal;
    });
    return totalSubtotal;
  }

  getTotalGrand() {
    return this.getTotalSubtotal() + 255.00;
  }
  


}
