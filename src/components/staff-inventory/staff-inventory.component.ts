import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { inventory } from 'src/models/inventory';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-staff-inventory',
  templateUrl: './staff-inventory.component.html',
  styleUrls: ['./staff-inventory.component.css']
})
export class StaffInventoryComponent implements OnInit{

  // inventoryList: inventory[] = [];

  // constructor(private apiService: ApiServiceService, private dialog: MatDialog) { }

  // ngOnInit(): void {
  //   this.apiService.fetchInventoryData().subscribe(data => {
  //     this.inventoryList = data;
  //     console.log(this.inventoryList);
  //   });
  // }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AddInventoryComponent, {
  //     width: '600px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.apiService.fetchInventoryData().subscribe(data => {
  //       this.inventoryList = data;
  //       console.log(this.inventoryList);
  //     });
  //   });
  // }

  displayedColumns: string[] = ['productId', 'productName', 'quantity', 'price', 'category', 'supplierName', 'sku','imgUrl'];
  inventoryDisplayed: MatTableDataSource<inventory> = new MatTableDataSource<inventory>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 1;
  itemsPerPage = 6;
  originalData: inventory[] = [];

  constructor(private apiService: ApiServiceService, private dialog:MatDialog) { }

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

  openDialog() {
      const dialogRef = this.dialog.open(AddInventoryComponent, {
        width: '600px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.apiService.fetchInventoryData().subscribe(data => {
          this.inventoryDisplayed.data = data; 
          console.log(this.inventoryDisplayed);
        });
      });
    }


}
