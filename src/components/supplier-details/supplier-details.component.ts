import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/services/api-service.service';
import { users } from 'src/models/users';


@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent{
  supplierDetails: users[] = [];

  constructor(private apiService:ApiServiceService){}

 
  // ngOnInit(): void {
  //   this.apiService.fetchSupplierDetails().subscribe(
  //     (data: users[]) => {
  //       console.log('fetched data', data);
  //       this.supplierDetails = data;
  //     },
  //     error => console.log('error occurred', error),
  //     () => console.log('request completed')
  //   );
  // }

}
