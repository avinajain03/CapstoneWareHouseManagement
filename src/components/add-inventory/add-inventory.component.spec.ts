import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryComponent } from './add-inventory.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from 'src/services/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AddInventoryComponent', () => {
  let component: AddInventoryComponent;
  let fixture: ComponentFixture<AddInventoryComponent>;
  let apiService: ApiServiceService;
  let dialogRef: MatDialogRef<AddInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInventoryComponent],
      imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, ApiServiceService, {
        provide: MatDialogRef,
        useValue: {
          close: jasmine.createSpy('close'),
        },
      }]
    });

    fixture = TestBed.createComponent(AddInventoryComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiServiceService);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new product to the inventory', () => {

    spyOn(apiService, 'addInventory').and.returnValue(of(''));
    component.addForm.setValue({
      productName: 'Paper Towel',
      supplierName: 'ThoughtBridge',
      price: 20,
      quantity: 50,
      category: 'household',
      sku: 'MKR12092ST'
    });

    component.onSubmit();

    expect(apiService.addInventory).toHaveBeenCalledWith({
      productName: 'Paper Towel',
      supplierName: 'ThoughtBridge',
      price: 20,
      quantity: 50,
      category: 'household',
      sku: 'MKR12092ST'
    });
    expect(dialogRef.close).toHaveBeenCalled();
    
  });
});


