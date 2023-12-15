import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffComponent } from './add-staff.component';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from 'src/services/api-service.service';
import { of } from 'rxjs';

describe('AddStaffComponent', () => {
  let component: AddStaffComponent;
  let fixture: ComponentFixture<AddStaffComponent>;
  let apiService:ApiServiceService;
  let dialogRef: MatDialogRef<AddStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStaffComponent],
      imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler, {
        provide: MatDialogRef,
        useValue: {
          close: jasmine.createSpy('close'),
        },
      }
      ]
    });
    fixture = TestBed.createComponent(AddStaffComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new staff to the users', () => {

    spyOn(apiService, 'addStaffData').and.returnValue(of(''));
    component.employeeForm.setValue(
      {
        userName:"Staff001",
        email:"staff001@gmail.com",
        password:"Staff0012!",
        contact:"9080706543",
        role:"staff"
      }
    );
    component.onSubmit();
    expect(apiService.addStaffData).toHaveBeenCalledWith({
      userName:"Staff001",
      email:"staff001@gmail.com",
      password:"Staff0012!",
      contact:"9080706543",
      role:"staff"
    });

    expect(dialogRef.close).toHaveBeenCalled();

  });
});
