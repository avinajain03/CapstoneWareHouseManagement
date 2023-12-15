import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/models/users';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MaterialModule } from 'src/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffComponent } from '../add-staff/add-staff.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{

  displayedColumns: string[] = ['userId', 'userName', 'email', 'password', 'contact', 'role'];
  employeesDisplayed: MatTableDataSource<users> = new MatTableDataSource<users>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private apiService: ApiServiceService, public dialog: MatDialog){
    this.employeesDisplayed = new MatTableDataSource<users>([]);
    this.paginator = this.paginator;   
  }

  ngOnInit(): void {
    this.apiService.fetchEmployeeData().subscribe(data => {
      this.employeesDisplayed = new MatTableDataSource<users>(data);
      console.log(this.employeesDisplayed.data);
      this.paginator = this.paginator;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStaffComponent, {
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.apiService.fetchEmployeeData().subscribe(data => {
        this.employeesDisplayed = new MatTableDataSource<users>(data);
        console.log(this.employeesDisplayed);
        this.paginator = this.paginator;
      });
    });
  }

  

}
