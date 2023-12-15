import { TestBed, fakeAsync } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inventoryDTO } from 'src/models/inventoryDTO';
import { vendorOrder } from 'src/models/vendorOrder';
import { inventory } from 'src/models/inventory';
import { users } from 'src/models/users';


describe('ApiServiceService', () => {
  let apiService: ApiServiceService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, ApiServiceService]
    });

    apiService = TestBed.inject(ApiServiceService);
    testingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should add product to cart', () => {

    const product: inventoryDTO = {
      "productName": "Shower Gel",
      "price": 328.47,
      "category": "personal care",
      "supplierName": "Skinix"
    };
    const order: vendorOrder = {
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 2,
      "category": "personal care",
      "subTotal": 656.94
    };

    apiService.addToCart(product).subscribe(data => {
      expect(data).toEqual(order);
    });

    const req = testingController.expectOne('http://localhost:8080/addToCart');
    expect(req.request.method).toEqual('POST');
    req.flush(order);

  });

  it('should delete order', () => {
    const vendorOrderId = '65570cecf6a138382a454a73';

    apiService.deleteOrder(vendorOrderId).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = testingController.expectOne(`http://localhost:8080/delete/${vendorOrderId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(true);
  });

  it('should update the inventory quantity for a particular product', () => {

    const productId = '654e023786b0887f88a1169f';
    const quantity = 5;

    apiService.updateInventory(productId, quantity).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = testingController.expectOne(`http://localhost:8080/updateInventory/${productId}/${quantity}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(true);
  });

  it('should fetch products of particular supplier', () => {
    const supplierName = 'Skinix';

    apiService.fetchSupplierProducts(supplierName).subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
    });

    const req = testingController.expectOne(`http://localhost:8080/inventory/supplierProducts/${supplierName}`);
    expect(req.request.method).toEqual('GET');
    req.flush([
      {
        "productName": "Carrot Muffin Spice",
        "quantity": 85,
        "price": 844.52,
        "category": "food",
        "supplierName": "Skinix",
        "sku": "MXM022446RF"
      },
      {
        "productName": "Shower Gel",
        "quantity": 48,
        "price": 328.47,
        "category": "personal care",
        "supplierName": "Skinix",
        "sku": "XJM655553TA"
      },
      {
        "productName": "Cleanser",
        "quantity": 53,
        "price": 547.25,
        "category": "personal care",
        "supplierName": "Skinix",
        "sku": "ATV833273EW"
      }, {
        "productName": "Coffee Fizz",
        "quantity": 41,
        "price": 44.46,
        "category": "beverages",
        "supplierName": "Skinix",
        "sku": "EWV136041RK"
      }
    ]);

  });

  it('should update particular product quantity', () => {
    const productId = '654e023786b0887f88a1169f';
    const quantity = 5;

    apiService.updateProductQuantity(productId, quantity).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = testingController.expectOne(`http://localhost:8080/inventory/${productId}/${quantity}`);
    expect(req.request.method).toEqual('POST');
    req.flush(true);

  });

  it('should add staff data', () => {
    const mockResponse = "Staff data added successfully";
    const staffData: users = {
      userName: "Staff007",
      password: "Staff0018!",
      email: "staff007@gmail.com",
      contact: "9890876544",
      role: "staff"
    };

    apiService.addStaffData(staffData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = testingController.expectOne(`http://localhost:8080/users/staff`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

  });

  it('should add product to the inventory', () => {
    const mockResponse = "Product added successfully";
    const mockData: inventory = {
      "productName": "Cappucino Cocktail",
      "quantity": 52,
      "price": 638.55,
      "category": "beverages",
      "supplierName": "Thoughtbridge",
      "sku": "RBV676022RF"
    };

    apiService.addInventory(mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = testingController.expectOne(`http://localhost:8080/addInventory`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

  });

  it('should fetch employee data', () => {
    const mockAdminUsers: users[] = [
      {
        userName: "Admin01",
        email: "admin001@gmail.com",
        password: "admin001!",
        contact: "9876543210",
        role: "admin"
      }];

    const mockStaffUsers: users[] = [
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
      }
    ];

    apiService.fetchEmployeeData().subscribe(data => {
      expect(data.length).toEqual(mockAdminUsers.length + mockStaffUsers.length);
    });

    const adminUsersReq = testingController.expectOne('http://localhost:8080/users/role/admin');
    expect(adminUsersReq.request.method).toEqual('GET');
    adminUsersReq.flush(mockAdminUsers);

    const staffUsersReq = testingController.expectOne('http://localhost:8080/users/role/staff');
    expect(staffUsersReq.request.method).toEqual('GET');
    staffUsersReq.flush(mockStaffUsers);

  });

  it('should update vendor order', () => { 
    const order: vendorOrder = { 
      "vendorOrderId": '65570cecf6a138382a454a73',
      "productId": "654e023786b0887f88a116a3",
      "productName": "Shower Gel",
      "supplierName": "Skinix",
      "price": 328.47,
      "productQuantity": 2,
      "category": "personal care",
      "subTotal": 656.94
    };

    apiService.updateVendorOrder(order).subscribe((response) => {
      expect(response).toEqual('Successfully updated vendor order.');
    });

    // const updateReq = testingController.expectOne(`http://localhost:8080/updateVendorOrder/${order.vendorOrderId}`);
    // expect(updateReq.request.method).toEqual('PUT');
  
    // updateReq.flush('Successfully updated vendor order.');
  });

  
  
});






