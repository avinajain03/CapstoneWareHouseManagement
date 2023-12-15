import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/services/api-service.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit{

  addForm: FormGroup;

  constructor(
    private apiService: ApiServiceService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddInventoryComponent>
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      productName: ['', Validators.required],
      supplierName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category:['', Validators.required],
      sku:['', Validators.required]
    });
  }


  onSubmit(): void {
    const employeeData = this.addForm.value;
    this.apiService.addInventory(employeeData).subscribe({
      next: (res) => {
        console.log(res);
        
      this.dialogRef.close(); 
    }});
  }

}
