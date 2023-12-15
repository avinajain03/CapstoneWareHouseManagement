import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiServiceService } from 'src/services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { users } from 'src/models/users';
import { of } from 'rxjs';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let apiService: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, ApiServiceService]
    });
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees details', () => {
    const mockData: users[] = [
      {
        userName: "Admin01",
        email: "admin001@gmail.com",
        password: "admin001!",
        contact: "9876543210",
        role: "admin"
      },
      {
        userName: "Staff01",
        email: "staff001@gmail.com",
        password: "Staff0012!",
        contact: "8765432190",
        role: "staff"
      },
      {
        userName: "Staff02",
        email: "staff002@gmail.com",
        password: "Staff0013!",
        contact: "9010802070",
        role: "staff"
      },
      {
        userName: "Staff03",
        email: "staff003@gmail.com",
        password: "Staff0014!",
        contact: "90807012345",
        role: "staff"
      },
      {
        userName: "Staff04",
        email: "staff004@gmail.com",
        password: "Staff0015!",
        contact: "9876034560",
        role: "staff"
      },
    ];

    spyOn(apiService, 'fetchEmployeeData').and.returnValue(of(mockData));
    component.ngOnInit();
    fixture.detectChanges();
    expect(apiService.fetchEmployeeData).toHaveBeenCalled();
    expect(component.employeesDisplayed.data).toEqual(mockData);

  });

  it('should open add staff dialog and refresh data on close', () => {
    const mockData: users[] = [
      {
        userName: "Admin01",
        email: "admin001@gmail.com",
        password: "admin001!",
        contact: "9876543210",
        role: "admin"
      },
      {
        userName: "Staff01",
        email: "staff001@gmail.com",
        password: "Staff0012!",
        contact: "8765432190",
        role: "staff"
      },
      {
        userName: "Staff02",
        email: "staff002@gmail.com",
        password: "Staff0013!",
        contact: "9010802070",
        role: "staff"
      },
      {
        userName: "Staff03",
        email: "staff003@gmail.com",
        password: "Staff0014!",
        contact: "90807012345",
        role: "staff"
      },
      {
        userName: "Staff04",
        email: "staff004@gmail.com",
        password: "Staff0015!",
        contact: "9876034560",
        role: "staff"
      },
    ];

    spyOn(apiService, 'fetchEmployeeData').and.returnValue(of(mockData));

     /* Create a spy object representing a dialogRef and set its afterClosed method to return the mock data when called */
    const dialogRefSpyObj = jasmine.createSpyObj({ 
      afterClosed: of(mockData) 
    });

     /* Create a spy on the dialog component's open method and set it to return the dialogRefSpyObj when called */
    const dialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj as any);
    
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(apiService.fetchEmployeeData).toHaveBeenCalled();
    expect(component.employeesDisplayed.data).toEqual(mockData);
  });


});
