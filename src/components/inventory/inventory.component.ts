import { Component, OnInit, ViewChild } from '@angular/core';
import { inventory } from 'src/models/inventory';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'productName', 'quantity', 'price', 'category', 'supplierName', 'sku','imgUrl'];
  inventoryDisplayed: MatTableDataSource<inventory> = new MatTableDataSource<inventory>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 1;
  itemsPerPage = 6;
  searchTerm: string = '';
  originalData: inventory[] = [];
  showFilters: boolean = false;
  categories: string[] = ['food', 'personal care', 'beverages', 'household'];
  categoriesChecked: string[] = [];

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.fetchInventoryData().subscribe(data => {
      this.originalData = data;
      this.inventoryDisplayed.data = data;
      this.inventoryDisplayed.paginator = this.paginator;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }

  get paginatedRows(): inventory[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.inventoryDisplayed.data.slice(startIndex, endIndex);
  }

  get totalRows(): number {
    return this.inventoryDisplayed.data.length;
  }

  searchInventory() {
    if (this.searchTerm === '') {
      this.inventoryDisplayed.data = this.originalData;
      this.inventoryDisplayed.paginator = this.paginator;
      this.currentPage = 1;
    } else {
      const filteredData = this.originalData.filter(
        inventory => inventory.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
          || inventory.supplierName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.inventoryDisplayed.data = filteredData;
      this.inventoryDisplayed.paginator = this.paginator;
      this.currentPage = 1;
    }
  }

  onCheckboxChange(event: any) {
    const category = event.target.id;
    if (event.target.checked) {
      this.categoriesChecked.push(category);
    } else {
      const index = this.categoriesChecked.indexOf(category);
      if (index >= 0) {
        this.categoriesChecked.splice(index, 1);
      }
    }
    this.filterInventory();
  }

  filterInventory() {
    if (this.categoriesChecked.length === 0) {
      this.inventoryDisplayed.data = this.originalData;
    } else {
      const filteredData = this.originalData.filter(inventory =>
        this.categoriesChecked.includes(inventory.category)
      );
      this.inventoryDisplayed.data = filteredData;
    }
    this.currentPage = 1;
    this.inventoryDisplayed.paginator?.firstPage();
  }

  showFilter() {
    this.showFilters = !this.showFilters;
    if (!this.showFilters) {
      this.categoriesChecked = [];
      this.filterInventory();
    }
  }
}