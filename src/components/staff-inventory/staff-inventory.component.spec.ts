import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInventoryComponent } from './staff-inventory.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from 'src/services/api-service.service';
import { of } from 'rxjs';
import { mockData } from 'src/models/mockData';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';

describe('StaffInventoryComponent', () => {
  let component: StaffInventoryComponent;
  let fixture: ComponentFixture<StaffInventoryComponent>;
  let apiService: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffInventoryComponent],
      imports: [MatDialogModule, MatPaginatorModule, BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler, ApiServiceService]
    });
    fixture = TestBed.createComponent(StaffInventoryComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
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
    expect(component.inventoryDisplayed.paginator).toBeDefined();

  });

  it('should update current page and items per page when page event is triggered', () => {
    const dummyEvent = {
      pageIndex: 1,
      pageSize: 6,
      length: 22
    };

    component.handlePageEvent(dummyEvent);

    expect(component.currentPage).toEqual(dummyEvent.pageIndex + 1);
    expect(component.itemsPerPage).toEqual(dummyEvent.pageSize);
  });

  it('should open dialog and fetch inventory data after dialog is closed', () => {

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true)
    } as MatDialogRef<AddInventoryComponent, any>);

    spyOn(apiService, 'fetchInventoryData').and.returnValue(of(mockData));
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalled();
    expect(apiService.fetchInventoryData).toHaveBeenCalled();
    expect(component.inventoryDisplayed.data).toEqual(mockData);
    
  });



});
