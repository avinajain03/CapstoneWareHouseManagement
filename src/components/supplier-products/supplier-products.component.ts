import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { UserService } from 'src/services/user.service';
import { inventory } from 'src/models/inventory';


@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.css']
})
export class SupplierProductsComponent implements OnInit{

  supplierName: string;
  supplierProducts: inventory[];

  constructor(private apiService:ApiServiceService){}

  ngOnInit(): void {
    this.loadSupplierName();
  }

  loadSupplierName(): void {
    this.apiService.fetchSupplierName().subscribe((name) => {
      this.supplierName = name;
      this.loadSupplierProducts();
    });
  }

  loadSupplierProducts(): void {
    this.apiService.fetchSupplierProducts(this.supplierName).subscribe((products) => {
      this.supplierProducts = products;
    });
  }

  restockProduct(product: inventory): void {
    product.quantity += 50;
    this.apiService.updateProductQuantity(product.productId, product.quantity).subscribe(() => {
        console.log(`Product quantity updated: ${product.quantity}`);
    });
}

}
