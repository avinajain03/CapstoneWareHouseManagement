import { Component, OnInit, ViewChild } from '@angular/core';
import { vendorOrder } from 'src/models/vendorOrder';
import { MaterialModule } from 'src/material/material.module';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.css']
})
export class TotalOrdersComponent {

  vendorOrders!: MatTableDataSource<vendorOrder>;
  displayedColumns: string[] = ['vendorOrderId', 'productId', 'productName', 'category', 'supplierName', 'price', 'productQuantity', 'SubTotal'];

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.loadVendorOrders();
  }

  loadVendorOrders(): void {
    this.apiService.getAllOrders().subscribe(data => {
      console.log(data);
      data.forEach(order => {
        order.subTotal = this.updateOrderPrice(order);
      });
      this.vendorOrders = new MatTableDataSource<vendorOrder>(data);
    });
  }

  updateOrderPrice(order: vendorOrder): number {
    order.subTotal = order.productQuantity * order.price;
    return order.subTotal;
  }

}
