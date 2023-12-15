import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiServiceService } from 'src/services/api-service.service';
import { vendorOrder } from 'src/models/vendorOrder';
import { of } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let apiService: ApiServiceService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      providers: [HttpClient, HttpHandler, ApiServiceService],
      imports: [MatPaginatorModule]
    });
    fixture = TestBed.createComponent(OrderComponent);
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
    expect(component.vendorOrders).toEqual(mockData);

  });

  it('should set page size and current page on page change', () => {
    const event = {
      pageIndex: 0,
      pageSize: 10
    } as PageEvent;

    component.onPageChange(event);

    expect(component.pageSize).toEqual(event.pageSize);
    expect(component.currentPage).toEqual(event.pageIndex);
  });

  it('should update subtotal for each product', () => {
    const order: vendorOrder = {
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 2,
      "category": "personal care",
      "subTotal": 0
    };

    const expectedSubTotal = 656.94;
    const actualSubTotal = component.updateOrderPrice(order);
    expect(actualSubTotal).toEqual(expectedSubTotal);
    expect(order.subTotal).toEqual(expectedSubTotal);
  });

  it('should call deleteOrder() method and delete order', () => {
    const mockOrder: vendorOrder = {
      "vendorOrderId": "123",
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 2,
      "category": "personal care",
      "subTotal": 656.94
    };

    const loadVendorOrdersSpy = spyOn(component, 'loadVendorOrders');
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(apiService, 'deleteOrder').and.returnValue(of('Order deleted successfully'));
    spyOn(apiService, 'updateInventory').and.returnValue(of('Inventory updated successfully'));
    spyOn(window, 'alert');

    component.deleteOrder(mockOrder);

    expect(window.confirm).toHaveBeenCalled();
    expect(apiService.deleteOrder).toHaveBeenCalledWith(mockOrder.vendorOrderId);
    expect(apiService.updateInventory).toHaveBeenCalledWith(mockOrder.productId, mockOrder.productQuantity);
    expect(window.alert).toHaveBeenCalledWith('Order deleted successfully');
    expect(loadVendorOrdersSpy).toHaveBeenCalled();

  });

  it('should increase product quantity and update order price', fakeAsync(() => {
    const mockOrder: vendorOrder = {
      "vendorOrderId": "123",
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 2,
      "category": "personal care",
      "subTotal": 656.94
    };

    const updateVendorOrderSpy = spyOn(apiService, 'updateVendorOrder').and.returnValue(of('Vendor order updated successfully.'));
    const updateInventorySpy = spyOn(apiService, 'updateInventory').and.returnValue(of('Inventory updated successfully'));
    const loadVendorOrdersSpy = spyOn(component, 'loadVendorOrders');

    component.increaseQuantity(mockOrder);

    expect(mockOrder.productQuantity).toEqual(3);
    expect(updateVendorOrderSpy).toHaveBeenCalledWith(mockOrder);
    expect(updateInventorySpy).toHaveBeenCalledWith(mockOrder.productId, -1);
    expect(loadVendorOrdersSpy).toHaveBeenCalled();

  }));

  it('should decrease product quantity and update order price', fakeAsync(() => {
    const mockOrder: vendorOrder = {
      "vendorOrderId": "123",
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 5,
      "category": "personal care",
      "subTotal": 1642.35
    };

    const updateVendorOrderSpy = spyOn(apiService, 'updateVendorOrder').and.returnValue(of('Vendor order updated successfully.'));
    const updateInventorySpy = spyOn(apiService, 'updateInventory').and.returnValue(of('Inventory updated successfully'));
    const loadVendorOrdersSpy = spyOn(component, 'loadVendorOrders');

    component.decreaseQuantity(mockOrder);

    expect(mockOrder.productQuantity).toEqual(4);
    expect(updateVendorOrderSpy).toHaveBeenCalledWith(mockOrder);
    expect(updateInventorySpy).toHaveBeenCalledWith(mockOrder.productId, 1);
    expect(loadVendorOrdersSpy).toHaveBeenCalled();

  }));

  it('should calculate total subtotal of all orders', () => {
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

    component.vendorOrders = mockData;
    const totalSubtotal = component.getTotalSubtotal();
    expect(totalSubtotal.toFixed(2)).toEqual("3418.20");

  });


});