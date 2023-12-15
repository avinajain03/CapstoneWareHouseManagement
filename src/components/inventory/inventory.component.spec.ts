import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from 'src/services/api-service.service';
import { mockData } from 'src/models/mockData';
import { of } from 'rxjs';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let apiService: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryComponent],
      imports: [MatPaginatorModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(InventoryComponent);
    apiService = TestBed.inject(ApiServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch inventory data on init', () => {
    spyOn(apiService, 'fetchInventoryData').and.returnValue(of(mockData));
    component.ngOnInit();
    expect(apiService.fetchInventoryData).toHaveBeenCalled();
    expect(component.inventoryDisplayed.data).toEqual(mockData);
    expect(component.originalData).toEqual(mockData);
  });

  it('should update currentPage and itemsPerPage when handlePageEvent is called', () => {
    const pageEvent = {
      pageIndex: 1,
      pageSize: 6,
      length: 10
    } as PageEvent;

    component.handlePageEvent(pageEvent);

    expect(component.currentPage).toEqual(2);
    expect(component.itemsPerPage).toEqual(6);
  });

  it('should search for inventory items', () => {

    component.originalData = [...mockData];
    const searchTerm = 'Cappucino Cocktail';
    component.searchTerm = searchTerm;
    component.searchInventory();

    const filteredData = mockData.filter(
      inventory => inventory.productName.toLowerCase().includes(searchTerm.toLowerCase())
        || inventory.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(component.inventoryDisplayed.data).toEqual(filteredData);
  });

  it('should search for inventory items when no search term', () => {
    component.searchTerm = '';
    component.searchInventory();
    expect(component.inventoryDisplayed.data).toEqual(component.originalData);

  });

  it('should filter inventory items by selected categories', () => {
    component.originalData = [...mockData];
    component.categoriesChecked = ['food', 'personal care'];
    component.filterInventory();
    const filteredData = mockData.filter(inventory => ['food', 'personal care'].includes(inventory.category));
    expect(component.inventoryDisplayed.data).toEqual(filteredData);

    component.categoriesChecked = ['beverages'];
    component.filterInventory();
    const newFilteredData = mockData.filter(inventory => ['beverages'].includes(inventory.category));
    expect(component.inventoryDisplayed.data).toEqual(newFilteredData);
  });

  it('should filter inventory items by when no categories checked', () => {
    component.originalData = [...mockData];
    component.categoriesChecked = []; 
    component.filterInventory();
    expect(component.inventoryDisplayed.data).toEqual(component.originalData);

  });


  it('should add a category to categoriesChecked list based on checkbox change', () => { 
    const category = 'beverages'; 
    const checkboxEvent = { 
      target: { 
        id: category, 
        checked: true 
      } 
    }; 
    component.onCheckboxChange(checkboxEvent); 
    expect(component.categoriesChecked.length).toEqual(1); 
    expect(component.categoriesChecked[0]).toEqual(category); 
  });


  it('should remove a category from categoriesChecked list based on checkbox change', () => { 
    const category = 'beverages'; 
    component.categoriesChecked.push(category); 
    const checkboxEvent = { 
      target: { 
        id: category, 
        checked: false 
      }
    }; 
    component.onCheckboxChange(checkboxEvent); 
    expect(component.categoriesChecked.length).toEqual(0); 
  });

  it('should toggle showFilters and filter inventory if showFilters is false', () => {
    component.originalData = [...mockData];
    component.showFilter();
    expect(component.showFilters).toEqual(true);
    component.categoriesChecked = ['beverages', 'food'];
    component.filterInventory();

    component.showFilter();
    expect(component.showFilters).toEqual(false);
    expect(component.categoriesChecked.length).toEqual(0);
    expect(component.inventoryDisplayed.data).toEqual(component.originalData);

  });

});
