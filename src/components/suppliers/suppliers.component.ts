import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/models/users';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
// import { MaterialModule } from 'src/material/material.module';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit{

  displayedColumns: string[] = ['userId', 'userName', 'email', 'password', 'contact', 'role'];
  suppliersDisplayed: MatTableDataSource<users> = new MatTableDataSource<users>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private apiService: ApiServiceService){
    this.suppliersDisplayed = new MatTableDataSource<users>([]);
  }

  ngOnInit(): void {
    this.apiService.fetchSupplierData().subscribe(data => {
      this.suppliersDisplayed = new MatTableDataSource<users>(data);
      console.log(this.suppliersDisplayed);
      this.paginator = this.paginator;
    });
  }

}
