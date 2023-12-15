import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from 'src/services/api-service.service';
import { inventoryDTO } from 'src/models/inventoryDTO';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiService: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [MatPaginatorModule, BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler, ApiServiceService]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockData: inventoryDTO[] = [
      {
        "productName": "Cappucino Cocktail",
        "price": 638.55,
        "category": "beverages",
        "supplierName": "Thoughtbridge"
      },
      {
        "productName": "Bar Nature Valley",
        "price": 654.49,
        "category": "personal care",
        "supplierName": "Thoughtbridge"
      },
      {
        "productName": "Carrot Muffin Spice",
        "price": 844.52,
        "category": "food",
        "supplierName": "Skinix"
      },
      {
        "productName": "Beef-Kindney",
        "price": 837.62,
        "category": "food",
        "supplierName": "Thoughtbridge"
      },
      {
        "productName": "Shower Gel",
        "price": 328.47,
        "category": "personal care",
        "supplierName": "Skinix"
      },
      {
        "productName": "Jolt Cola-Electric Blue",
        "price": 448.05,
        "category": "beverages",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Bread-White Epi Baguette",
        "price": 920.42,
        "category": "food",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Chandelier",
        "price": 64.12,
        "category": "household",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Cleanser",
        "price": 547.25,
        "category": "personal care",
        "supplierName": "Skinix"
      },
      {
        "productName": "Chinese Lemon Pork",
        "price": 69.76,
        "category": "food",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Mozzarella Cheese",
        "price": 197.28,
        "category": "food",
        "supplierName": "Divanoodle"
      },
      {
        "productName": "Crab Flakes",
        "price": 380.19,
        "category": "food",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Coffee Fizz",
        "price": 44.46,
        "category": "beverages",
        "supplierName": "Skinix"
      },
      {
        "productName": "Toner",
        "price": 621.12,
        "category": "personal care",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Kettle",
        "price": 86.61,
        "category": "household",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Potato Chips",
        "price": 249.56,
        "category": "food",
        "supplierName": "Thoughtbridge"
      },
      {
        "productName": "Curtains",
        "price": 426.33,
        "category": "household",
        "supplierName": "Thoughtbridge"
      },
      {
        "productName": "Nescafe - Frothy French Vanilla",
        "price": 965.28,
        "category": "beverages",
        "supplierName": "Divanoodle"
      },
      {
        "productName": "Shrimp",
        "price": 839.44,
        "category": "food",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Blender",
        "price": 746.43,
        "category": "household",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Perfume",
        "price": 320.34,
        "category": "",
        "supplierName": "Mydeo"
      },
      {
        "productName": "Bedsheets",
        "price": 120,
        "category": "household",
        "supplierName": "ThoughtBridge"
      }
    ];

    spyOn(apiService, 'getAllProducts').and.returnValue(of(mockData));
    component.loadProducts();
    expect(component.productsDisplayed).toEqual(mockData);
    expect(component.totalRecords).toEqual(mockData.length);
    expect(component.paginator.pageIndex).toEqual(0);

  });

  it('should set page size and current page on page change', () => {
    const event = {
      pageIndex: 0,
      pageSize: 8
    } as PageEvent;

    component.onPageChange(event);

    expect(component.pageSize).toEqual(event.pageSize);
    expect(component.currentPage).toEqual(event.pageIndex);
  });

  it('should add to cart', () => {

    const mockData: inventoryDTO = {
      "productName": "Cappucino Cocktail",
      "price": 638.55,
      "category": "beverages",
      "supplierName": "Thoughtbridge"
    }

    const apiService = TestBed.inject(ApiServiceService);
    spyOn(apiService, 'addToCart').and.returnValue(of({ success: true }));
    spyOn(window, 'alert');

    component.addToCart(mockData);

    expect(apiService.addToCart).toHaveBeenCalledWith(mockData);
    expect(window.alert).toHaveBeenCalledWith('Product added to cart!');

  });

});
