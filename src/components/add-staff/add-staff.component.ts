import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/services/api-service.service';
import { ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit{

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiServiceService, public dialogRef: MatDialogRef<AddStaffComponent>) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const employeeData = this.employeeForm.value;
    this.apiService.addStaffData(employeeData).subscribe({
      next: (res) => {
        console.log(res);
        
      this.dialogRef.close(); 
    }});
  }

}
