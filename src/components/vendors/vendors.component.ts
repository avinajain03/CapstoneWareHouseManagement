import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/models/users';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit{

  displayedColumns: string[] = ['userId', 'userName', 'email', 'password', 'contact', 'role'];
 vendorsDisplayed: MatTableDataSource<users> = new MatTableDataSource<users>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private apiService: ApiServiceService){
    this.vendorsDisplayed = new MatTableDataSource<users>([]);
  }

  ngOnInit(): void {
    this.apiService.fetchVendorData().subscribe(data => {
      this.vendorsDisplayed = new MatTableDataSource<users>(data);
      console.log(this.vendorsDisplayed);
      this.paginator = this.paginator;
    });
  }

}
