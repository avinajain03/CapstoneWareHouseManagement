import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { users } from 'src/models/users';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit{
  supplierDetails: users[] = [];

  constructor(private apiService:ApiServiceService){}

 
  ngOnInit(): void {

    // this.apiService.fetchSupplierDetails().subscribe(data => {
    //   console.log(typeof(data));
    //   console.log('fetched data', data);
      
    //   this.supplierDetails = JSON.parse(data); // Parse string to JSON format
    
    //   console.log(typeof(this.supplierDetails));
    //   console.log('fetched data', this.supplierDetails);
    // });

    this.apiService.fetchSupplierDetails().subscribe(
      (data: users[]) => {
        console.log('fetched data', data);
        this.supplierDetails = data;
      },
      error => console.log('error occurred', error),
      () => console.log('request completed')
    );
  }

}
