import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOrdersComponent } from './total-orders.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiServiceService } from 'src/services/api-service.service';
import { vendorOrder } from 'src/models/vendorOrder';
import { of } from 'rxjs';

describe('TotalOrdersComponent', () => {
  let component: TotalOrdersComponent;
  let fixture: ComponentFixture<TotalOrdersComponent>;
  let apiService: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalOrdersComponent],
      providers: [HttpClient, HttpHandler, ApiServiceService]
    });
    fixture = TestBed.createComponent(TotalOrdersComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sholud load vendor orders', () => {

    const mockData: vendorOrder[] = [{
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 2,
      "category": "personal care",
      "subTotal": 656.94
    },
    {
      "productId": "654e023786b0887f88a116a5",
      "productName": "Bread-White Epi Baguette",
      "supplierName": "Mydeo",
      "price": 920.42,
      "productQuantity": 3,
      "category": "food",
      "subTotal": 2761.26
    }];

    spyOn(apiService, 'getAllOrders').and.returnValue(of(mockData));

    component.loadVendorOrders();

    expect(apiService.getAllOrders).toHaveBeenCalled();
    expect(component.vendorOrders.data).toEqual(mockData);

  });


});
