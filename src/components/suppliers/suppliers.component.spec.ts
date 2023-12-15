import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersComponent } from './suppliers.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { users } from 'src/models/users';
import { ApiServiceService } from 'src/services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('SuppliersComponent', () => {
  let component: SuppliersComponent;
  let fixture: ComponentFixture<SuppliersComponent>;
  let apiService: ApiServiceService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, ApiServiceService]
    });
    fixture = TestBed.createComponent(SuppliersComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch supplier data on init', () => {
    const mockData: users[] = [
      {
        "userName": "Thoughtbridge",
        "email": "thoughtbridge@gmail.com",
        "password": "thoughtBridge0013!",
        "contact": "9988776655",
        "role": "supplier"
      },
      {
        "userName": "Skinix",
        "email": "skinix@gmail.com",
        "password": "Skinix0014!",
        "contact": "9897969594",
        "role": "supplier"
      },
      {
        "userName": "Mydeo",
        "email": "mydeo@gmail.com",
        "password": "myDeo0015!",
        "contact": "9080706050",
        "role": "supplier"
      },
      {
        "userName": "DivaNoodle",
        "email": "divanoodle@gmail.com",
        "password": "divaNoodle0016!",
        "contact": "7891234560",
        "role": "supplier"
      }
    ];

    spyOn(apiService, 'fetchSupplierData').and.returnValue(of(mockData));
    component.ngOnInit();
    fixture.detectChanges();
    expect(apiService.fetchSupplierData).toHaveBeenCalled();
    expect(component.suppliersDisplayed.data).toEqual(mockData);
  });
});
