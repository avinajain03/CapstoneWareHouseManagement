import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierProductsComponent } from './supplier-products.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiServiceService } from 'src/services/api-service.service';
import { of } from 'rxjs';
import { inventory } from 'src/models/inventory';

describe('SupplierProductsComponent', () => {
  let component: SupplierProductsComponent;
  let fixture: ComponentFixture<SupplierProductsComponent>;
  let apiService: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierProductsComponent],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(SupplierProductsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the supplier name and call loadSupplierProducts()', () => {
    const mockSupplier = 'Skinix';
    spyOn(apiService, 'fetchSupplierName').and.returnValue(of(mockSupplier));
    spyOn(component, 'loadSupplierProducts');

    component.loadSupplierName();

    expect(apiService.fetchSupplierName).toHaveBeenCalled();
    expect(component.supplierName).toEqual(mockSupplier);
    expect(component.loadSupplierProducts).toHaveBeenCalled();

  });

  it('should load supplier products', () => {

    const mockData: inventory[] = [
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
    ];
    const mockSupplier = "Skinix";
    spyOn(apiService, 'fetchSupplierProducts').and.returnValue(of(mockData));

    component.supplierName = mockSupplier;
    component.loadSupplierProducts();

    expect(apiService.fetchSupplierProducts).toHaveBeenCalledWith(mockSupplier);
    expect(component.supplierProducts).toEqual(mockData);
  });

  it('should restock product', () => {

    const mockData: inventory = {
      "productName": "Carrot Muffin Spice",
      "quantity": 4,
      "price": 844.52,
      "category": "food",
      "supplierName": "Skinix",
      "sku": "MXM022446RF"
    };

    spyOn(apiService, 'updateProductQuantity').and.returnValue(of(null));

    component.restockProduct(mockData);

    expect(mockData.quantity).toEqual(54); 
    expect(apiService.updateProductQuantity).toHaveBeenCalledWith(mockData.productId, mockData.quantity);

  });

});
